import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Resume from './views/Resume';
import Login from './views/Login';
import Signup from './views/Signup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App() {
  const userID = localStorage.getItem('userID');
  const isLoggedIn = () => {
    if (userID != null) {
      return (
        <NavDropdown title="Portfolio" id="collapsible-nav-dropdown">
          <NavDropdown.Item href="/apps/chatbot_app">ChatBot_App</NavDropdown.Item>
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
        </NavDropdown>
      )
    } else {
      return (
        <NavDropdown title="Login/Signup" id="collapsible-nav-dropdown">
          <NavDropdown.Item href="login">Login</NavDropdown.Item>
          <NavDropdown.Item href="signup">Signup</NavDropdown.Item>
        </NavDropdown>
      )
    }
  };

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Welcome</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/resume">Resume</Nav.Link>
              {isLoggedIn()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/resume" element={ <Resume/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
      </Routes>
      <hr />
      <footer className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Copyright © MyWebsite. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;