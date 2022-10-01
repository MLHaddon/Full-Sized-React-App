import { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import LoginForm from '../components/LoginForm';

function Login() {

  useEffect(e => {
    console.log(userId);
  })

  const [userId, setUserId] = useState()

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleFormChange = e => { // setUser to search the user object for target name (create if not exist), then set each value.
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    axios.get('http://127.0.0.1:5001/api/users/login', {
      params: {
        username: user.username
      }
    })
      .then(res => {
        setUserId(res.data.data.id);
        console.log(res.data.data);
      })
    sessionStorage.setItem('user', userId);
  };

  return (
    <div className="mw-50 m-auto" style={{width: "400px"}} >
      <LoginForm
        inputs = {user}
        errors = {errors}
        handleChange = {handleFormChange}
        handleSubmit = {handleFormSubmit}
      />
      <p className="forgot-password text-right">
          Forgot <Link to="../">password?</Link>
      </p>
    </div>
  );
}

export default Login;