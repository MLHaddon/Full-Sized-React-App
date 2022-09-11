import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <h1>This is the Signup page</h1>
      <Link to="/">Home</Link>
	  <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Signup;