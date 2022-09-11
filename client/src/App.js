import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Login from './views/Login';
import Signup from './views/Signup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  return (
    <div className="App">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Welcome</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="login">Login</NavDropdown.Item>
              <NavDropdown.Item href="signup">Signup</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
	  	<Route path="/" element={ <Home/> } />
	  	<Route path="profile" element={ <Profile/> } />
	  	<Route path="login" element={ <Login/> } />
	  	<Route path="signup" element={ <Signup/> } />
	  </Routes>
    </div>
  );
}

export default App;