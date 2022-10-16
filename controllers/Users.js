import Users from '../models/UserModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'username', 'email']
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export const Register = async(req, res) => {
  const {username, email, password, confPwd} = req.body;
  if(password !== confPwd) return res.status(400).json({msg: "Passwords must match"});
  const salt = await bcrypt.genSalt();
  const hashPwd = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      username: username,
      email: email,
      password: hashPwd
    })
    res.json({msg: "Registration Successful"});
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}

export const Login = async(req, res) => {
  // Assign the user var with a user that matches the email provided
  try {
    const user = await Users.findAll({
      where: {
        username: req.body.username
      }
    });

    // Compare the password hashes using Bcrypt
    const match = await bcrypt.compare(req.body.password, user[0].password);

    // If they dont match end the function and return a message
    if (!match) return res.status(400).json({msg: "Wrong Password"});
    const userID = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({userID, username, email}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s'
    });
    const refreshToken = jwt.sign({userID, username, email}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    await Users.update({refresh_token: refreshToken}, {
      where: {
        id: userID
      }
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({msg: "Username not found"});
  }
}

export const Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
      where:{
          refresh_token: refreshToken
      }
  });
  if(!user[0]) return res.sendStatus(204);
  const userID = user[0].id;
  await Users.update({refresh_token: null},{
      where:{
          id: userID
      }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}