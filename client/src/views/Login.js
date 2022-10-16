import axios from "../api/axios";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";


function Login() {

      // Add user and errors to the state
      const [user, setUser] = useState({
        username: "",
        password: "",
      });

      // Variables
      const navigate = useNavigate();
      const [msg, setMsg] = useState('');
    
      // Active form handling (Updates with the state)
      const handleFormChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
    
      // Send an axios request to log the user in
      //TODO: Add security measures for user ID's and hash the password
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios
            .post("api/login", {
              username: user.username,
              password: user.password
            });
          navigate("/");
        } catch (error) {
          if (error) {
            setMsg(error.response.data.msg);
          }
        }
      };
  return (
    <div className="mw-50 m-auto" style={{ width: "400px" }}>
      <p className="has-text-centered">{msg}</p>
      <LoginForm
        inputs={user}
        handleChange={handleFormChange}
        handleSubmit={handleFormSubmit}
      />
      <p className="forgot-password text-right">
        Forgot <Link to="../">password?</Link>
      </p>
    </div>
  );
}

export default Login;
