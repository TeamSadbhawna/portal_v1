import React , { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import AuthUserContext from "./AuthUserContext";
import { auth } from '../firebase/index'
import {
  Nav,
  Row,
  Col,
  Container
} from 'react-bootstrap';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth userInfo={authUser} /> : null
    }
  </AuthUserContext.Consumer>
);

export default Navigation;

const Mystyle = {color: "white", fontSize: "18px", padding: "10px"};

const NavigationAuth = ({ userInfo }) => {

  return  <Container style={{width: "100%", margin: "auto", backgroundColor: "#1f76bd", color: "white"}}>
      <center>
      <Row style={{width: "100%", margin: "auto"}}>
        <Col>
          <h2>Sadbhawna - Fighting Covid-19 Together</h2>
        </Col>
      </Row>
      <Row style={{width: "100%", margin: "auto"}}> 
        <Col>
          <Nav>
            <Nav.Link ><Link to={routes.ACCOUNT} style={Mystyle} >Profile</Link></Nav.Link>
            <Nav.Link href="#vision" style={Mystyle} >Visions</Nav.Link>
            <Nav.Link href="#about" style={Mystyle} >About</Nav.Link>
            <Nav.Link onClick={auth.doSignOut} style={Mystyle} >SignOut</Nav.Link>
          </Nav>
        </Col>
      </Row>
      <br/>
      </center>
    </Container>
};
