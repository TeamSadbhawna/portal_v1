import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import Datareact from '../data';
import Aboutreact from '../about';
import Navigation from './Navigation';
import { Button } from 'react-bootstrap'

const Mystyle = {color: "white", fontSize: "18px", padding: "10px"};

class LandingPage extends Component {
    render() {
      return (
        <center style={{backgroundColor: "black"}}>
          <Navigation />
          <Datareact />
          <div style={{backgroundColor: "black", margin: "20px"}}>
            <h3 style={{color: "white"}}>If you want to post or share your resources, you have to signin/singup.</h3>
            <Button>
              <Link style={Mystyle}  to={routes.SIGN_IN}>SignIn/SignUp</Link>
            </Button>
          </div>
          <Aboutreact />
        </center>
      );
    }
}
  
  export default LandingPage;