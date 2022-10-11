import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import LoginForm from '../components/LoginForm';

function Login() {
  // Add user and errors to the state
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  
  // Variables
  const navigate = useNavigate();

  // Active form handling (Updates with the state)
  const handleFormChange = e => { 
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  };

  // Send an axios request to log the user in
  //TODO: Add security measures for user ID's and hash the password
  const handleFormSubmit = async e => {
    e.preventDefault();
    await axios.get('http://127.0.0.1:5001/api/users/login', {
      params: {
        username: user.username
      }
    })
      .then(res => {
        localStorage.setItem('userID', res.data.data[0].id);
        console.log(res.data.data[0].id);
        console.log(localStorage.getItem('userID'));
      })
      .catch(err => {
        setErrors([err]);
      })
    navigate('/');
    window.location.reload(false);
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