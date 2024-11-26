import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/login", user);
      const { accessToken, userID, username } = response.data;
      console.log(response.data);
      login(accessToken, { id: userID, username });
      username === 'admin' ? navigate('/ecommerce/AdminPanel', {replace: true}) : navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="mw-50 m-auto" style={{ width: "400px" }}>
      {error && <p className="text-danger text-center">{error}</p>}
      <LoginForm
        inputs={user}
        handleChange={handleFormChange}
        handleSubmit={handleFormSubmit}
      />
      <p className="forgot-password text-right">
        <Link to="/forgot-password">Forgot password?</Link>
      </p>
    </div>
  );
}

export default Login;

