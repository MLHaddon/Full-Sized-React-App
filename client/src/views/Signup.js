import { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import SignupForm from '../components/SignupForm';

function Signup() {

  const [userId, setUserId] = useState()

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

  const handleFormSubmit = async e => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5001/api/users/new', user)
    await axios.get('http://127.0.0.1:5001/api/users/login', {
      params: {
        username: user.username
      }
    })
      .then(res => {
        localStorage.setItem('userID', res.data.data[0].id);
      })
    Navigate('/');
  };

  return (
    <div className="mw-50 m-auto" style={{width: "400px"}} >
      <SignupForm
        inputs = {user}
        errors = {errors}
        handleChange = {handleFormChange}
        handleSubmit = {handleFormSubmit}
      />
      <p className="text-right">
        Already registered <Link to="../login">log in?</Link>
      </p>
    </div>
  );
}

export default Signup;