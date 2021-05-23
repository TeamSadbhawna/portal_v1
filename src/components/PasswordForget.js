import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert, Container } from "reactstrap";

import { auth } from "../firebase";
import * as routes from "../constants/routes";

//it resets your password. It doesn’t matter if you are authenticated or not
const PasswordForgetPage = () => (
  <div className="div-flex">
    <center>
      <img className="authlogo" src="./images/logobanner.png" style={{height: "55px"}} alt="My logo" />
      <hr/>
      <PasswordForgetForm />
      <br/>
      <Button style={{fontSize: "18px", height:"40px", backgroundColor: "darkblue"}}><Link to={routes.SIGN_IN} style={{fontSize: "18px", color: "white", textDecoration: "none"}} >Back to SignUp Page</Link></Button>
    </center>
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//################### PasswordForget Form ###################
const INITIAL_STATE = {
  email: "",
  error: null,
  showingAlert: false
};



class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };
  
  onSubmit = event => {
    const { email } = this.state;
    auth
      .doPasswordReset(email)
      .then(() => {
        alert("We have sent you reset password link to your registered email address.");
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //show alert message for some seconds
      });

    event.preventDefault();
  };

  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 0);
  };

  render() {
    const { email, error, showingAlert } = this.state;

    const isInvalid = email === "";

    return (
      <Container>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {alert(error.message)}
          </Alert>
        )}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail" style={{ fontSize:"20px"}}>Email</Label>
            <Input style={{width:"80%", fontSize:"20px"}}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              value={email}
              autoFocus
              required
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>
          <div className="text-center">
            <Button disabled={isInvalid} type="submit" style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
              Reset My Password
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

//################### PasswordForget Link ###################
const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET} style={{fontSize: "18px"}}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };

