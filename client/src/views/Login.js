import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>This is the Login page</h1>
	    <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Login;