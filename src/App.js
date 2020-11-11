import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {AppContext} from "./libs/contextLib";
import {Auth} from "aws-amplify";

function App() {

  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  

  async function handleLogout(){
    await Auth.signOut();

    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  },[]);

  async function onLoad(){
    try{

      await Auth.currentSession();
      userHasAuthenticated(true);

    }catch(e){
      console.log(e);
      if(e !== 'No current user'){
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && 
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <NavbarBrand>
            <Link to="/">Scratch</Link>
          </NavbarBrand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? 
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
