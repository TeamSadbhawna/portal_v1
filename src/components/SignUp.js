import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert, Container } from "reactstrap";

import * as routes from "../constants/routes";
import { auth, db } from "../firebase";
import Aboutreact from '../about';

const SignUpPage = ({ history }) => (
  <div>
    <div className="div-flex">
      <center>
        <img className="authlogo" src="./images/logobanner.png" style={{height: "55px"}} alt="My logo" />
        <hr/>
        <SignUpForm history={history} />
        <br/>
        <Button style={{fontSize: "18px", height:"40px", backgroundColor: "darkblue"}}><Link to={routes.SIGN_IN} style={{fontSize: "18px", color: "white", textDecoration: "none"}} >Back to Sign In Page</Link></Button>
      </center>
      <br/>
      <Aboutreact />
    </div>
  </div>
);

//################### Sign Up Form ###################
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  phone: "",
  city: "",
  error: null,
  showingAlert: false
};

//A Higher order function with prop name as key and the value to be assigned to
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  //defining state
  state = {
    ...INITIAL_STATE
  };

  onSubmit = event => {
    const { username, email, passwordOne, phone, city } = this.state;
    const { history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      //it the above functions resolves, reset the state to its initial state values, otherwise, set the error object
      .then(authUser => {
        //creating a user in the database after the sign up through Firebase auth API
        db.doCreateUser(authUser.user.uid, username, email, phone, city.toUpperCase())
          .then(() => {
            alert("Welcome " + username + "!\nwe have succesfully created your account. Now you can SignIn to Sadbhawna.");
            this.setState({
              ...INITIAL_STATE
            });
            history.push(routes.SIGN_IN);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
            this.timer(); //show alert message for some seconds
          });
      })
      .catch(err => {
        this.setState(byPropKey("error", err));
        this.timer(); //show alert message for some seconds
      });

    event.preventDefault(); //prevents refreshing
  };

  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    },0);
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      phone,
      city,
      error,
      showingAlert
    } = this.state;
    //a boolen to perform validation
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      city === "" ||
      phone.length === 9;

    let passlevel = "Password must contain at least 8 characters", passlevelstyle={color: "black"};
    if (passwordOne.length < 8) {
      passlevel = "Password must contain at least 8 characters ";
      passlevelstyle={color: "red"}
    } else if (passwordOne.length <= 10 && passwordOne.length >= 8) {
      passlevel = "Weak";
      passlevelstyle={color: "red"}
    } else if(passwordOne.length < 15) {
      passlevel = "Good";
      passlevelstyle={color: "blue"}
    } else if(passwordOne.length >= 15) {
      passlevel = "Strong";
      passlevelstyle={color:"green"}
    } else {
      passlevel = "Password must contain at least 8 characters";
      passlevelstyle={color: "black"};
    }
    
    return (
      <Container>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {alert(error.message)}
          </Alert>
        )}
        <h3>All fields are required to be filled</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="userName" style={{ fontSize:"20px"}}>Full Name</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="username"
              name="username"
              id="userName"
              placeholder="John Jose"
              value={username}
              autoFocus
              required
              onChange={e =>
                this.setState(byPropKey("username", e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail" style={{ fontSize:"20px"}}>Email</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              value={email}
              required
              onChange={e => this.setState(byPropKey("email", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplecity" style={{ fontSize:"20px"}}>Address</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="text"
              name="city"
              id="examplecity"
              placeholder="Currently city"
              value={city}
              required
              onChange={e => this.setState(byPropKey("city", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePhone" style={{ fontSize:"20px"}}>Phone no</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="text"
              name="phone"
              id="examplephone"
              placeholder="10 digit mobile no"
              value={phone}
              required
              onChange={e => this.setState(byPropKey("phone", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword1" style={{ fontSize:"20px"}}>Password</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="password"
              name="password"
              id="examplePassword1"
              placeholder="Password"
              value={passwordOne}
              required
              onChange={e =>
                this.setState(byPropKey("passwordOne", e.target.value))
              }
              />
              <strong>Password Level:</strong><p style={passlevelstyle}>{passlevel}</p>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword2" style={{ fontSize:"20px"}}>Confirm Password</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="password"
              name="password"
              id="examplePassword2"
              placeholder="Confirm Password"
              value={passwordTwo}
              required
              onChange={e =>
                this.setState(byPropKey("passwordTwo", e.target.value))
              }
              
            />
          </FormGroup>

          <div className="text-center">
            <Button disabled={isInvalid} type="submit" style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

//################### Sign Up Link ###################
//used in the sign in when the user don't have an account registered yet
const SignUpLink = () => (
  <p style={{fontSize: "18px"}}>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

//exports
export default withRouter(SignUpPage); //using a HoC to get access to history
export { SignUpForm, SignUpLink };

