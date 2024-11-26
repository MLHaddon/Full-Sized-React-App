import { useNavigate } from "react-router-dom";

function Redirect() {
  const navigate = useNavigate();
  navigate("/ecommerce/home");
};

export default Redirect;