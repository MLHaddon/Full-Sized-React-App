import Mountains from './images/co_mountains.jpg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Home() {


  return (
    <div>
      <img className="img-fluid" src={Mountains} alt="Mountains" style={{width: "100%", height: "auto", minHeight: "300px"}} />
      <h2 className="text-lg-center position-relative">Please click on Profile to see my resume or Login/Signup to view my portfolio.</h2>
      <Button className="btn-lg position-absolute translate-middle" style={{top: "50%", left: "50%"}}><Link to="/resume" className='text-light'>View my Resume</Link></Button>
    </div>
  );
}

export default Home;