import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import SignupForm from '../components/signupForm';

function Signup() {

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
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
    axios.post('http://127.0.0.1:5000/api/new_user', user)
      .then(res => {
        Navigate("/home")
      })
      .catch(err => {
        setErrors([err]);
      })
  }

  return (
    <div className="mw-50 m-auto" style={{width: "400px"}} >
      <SignupForm
        inputs = {user}
        errors = {errors}
        handleChange = {handleFormChange}
        handleSubmit = {handleFormSubmit}
      />
      <p className="text-right">
        Already registered <Link to="login">log in?</Link>
      </p>
    </div>
  );
}

export default Signup;