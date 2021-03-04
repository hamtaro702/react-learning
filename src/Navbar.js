import React from 'react'
import {Nav,Navbar,NavDropdown,FormControl,Form,Button,FormLabel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import useToken from './useToken'
import useUsername from './useUsername'

const NavigationBar =()=>{

  const { username, setUsername } = useUsername();
  const { token, setToken } = useToken();

  const logout=()=>{
    
    sessionStorage.clear()
    localStorage.clear()
    console.log("Logout...")
  }

    return (
        <Navbar bg="crimson" expand="lg">
        <Navbar.Brand href="/">Infrastructure Access Control</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/checkIn">CheckIn</Nav.Link>
            <Nav.Link href="/about">Request</Nav.Link>
            <Nav.Link href="/listAll">ListAll</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <i class="bi bi-person-circle"style={{color: "white"}}>{username} </i> <ul> </ul><br/>
          <Form inline>
          {
          token 
          ? (
              <div className="authentication">
                <button class="btn btn-labeled btn-danger" onClick={logout}>Logout
                
                <span class="btn-label"><i class="fa fa-remove"></i></span></button>
              </div>
            )
          : ( 
              <a href='http://localhost:3000/'>
                <button>Login</button>
              </a>
            )
          }
          </Form>
         
        </Navbar.Collapse>
      </Navbar>

    )
}

export default NavigationBar;