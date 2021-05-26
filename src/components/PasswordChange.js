import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Container } from "reactstrap";

import { auth } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
  showingAlert: false
};

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
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
    const { passwordOne, passwordTwo, error, showingAlert } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    let passlevel = "Password must contain at least 8 characters or digits", passlevelstyle={color: "black"};
    if (passwordOne.length < 8) {
      passlevel = "Password must contain at least 8 characters or digits";
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
      passlevel = "Password must contain at least 8 characters or digits";
      passlevelstyle={color: "black"};
    }
    return (
      <div style={{ marginTop: "40px" }}>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {alert(error.message)}
          </Alert>
        )}
        <Container>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="examplePassword1" style={{ fontSize:"20px"}}>New Password</Label>
              <Input style={{width:"75%", fontSize:"20px"}}
                type="password"
                name="password"
                id="examplePassword1"
                placeholder="New Password"
                value={passwordOne}
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
                onChange={e =>
                  this.setState(byPropKey("passwordTwo", e.target.value))
                }
              />
            </FormGroup>

            <div className="text-center">
              <Button disabled={isInvalid} type="submit" style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
                Change My Password
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default PasswordChangeForm;