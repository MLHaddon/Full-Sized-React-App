const { Users } = require('../models/user.model');

module.exports = {
  allUsers: (req, res) => {
    Users.find({}).sort({type: "asc"})
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  },
  newUser: (req, res) => {
    const {username, password, email} = req.body;
    Users.create({
      username, 
      password, 
      email
    })
      .then(new_User => res.json(new_User))
      .catch(err => res.status(400).json(err));
  },
  oneUser: (req, res) => {
    Users.findOne({_id: req.params.id})
      .then(User => res.json(User))
      .catch(err => res.status(400).json(err));
  },
  updateUser: (req, res) => {
    Users.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators:true})
      .then(User => res.json(User))
      .catch(err => res.status(400).json(err));
  },
  deleteUser: (req, res) => {
    Users.deleteOne({_id: req.params.id})
      .then(success => res.json(success))
      .catch(err => res.status(400).json(err));
  }
}