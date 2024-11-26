
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import SignupForm from '../components/SignupForm';
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confPwd: ''
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confPwd) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('api/register', {
        username: user.username,
        email: user.email,
        password: user.password,
        confPwd: user.confPwd
      });

      const { accessToken, userID, username } = response.data;

      login(accessToken, { id: userID, username });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="mw-50 m-auto" style={{width: "400px"}} >
      {error && <p className="text-danger text-center">{error}</p>}
      <SignupForm
        inputs={user}
        handleChange={handleFormChange}
        handleSubmit={handleFormSubmit}
      />
      <p className="text-right">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
