import '../css/style.css';
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Container } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth, db } from "../firebase";
import * as routes from "../constants/routes";
import Aboutreact from '../about';


const Mystyle = {color: "white", fontSize: "18px", padding: "10px"};

const SignInPage = ({ history }) => {
  return (
    <div className="div-flex">
      <center>
      <Link to={routes.LANDING}><img className="authlogo" src="./images/logobanner.png" style={{height: "55px"}} alt="My logo" /></Link>
        <hr/>
        </center>
        <center>
          
          <SignInForm history={history} />
        <SignUpLink />
        <PasswordForgetLink />
        <br/>
        <Button style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
            <Link style={Mystyle} to={routes.LANDING}>Back to Home</Link>
        </Button>
        <hr/>
        <Aboutreact />
      </center>
    </div>
  );
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  showingAlert: false
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //defined below
      });

    event.preventDefault();
  };

  facebookLogin = () => {
    const { history } = this.props;
    auth
      .doFacebookSignIn()
      .then(authUser => {
        console.log("authUser", authUser);

        db.doCreateUser(
          //store some info from facebook into the firebase db
          authUser.user.uid,
          authUser.user.displayName,
          authUser.user.email
        )
          .then(() => {
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
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
    const { email, password, error, showingAlert } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <Container>
        <center>
          {showingAlert && (
            <Alert color="danger" onLoad={this.timer}>
            {alert(error.message)}
            </Alert>
          )}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail" style={{ fontSize:"20px"}}>Email</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword" style={{ fontSize:"20px"}}>Password</Label>
            <Input style={{width:"75%", fontSize:"20px"}}
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
              />
          </FormGroup>

          <div className="text-center">
            <Button disabled={isInvalid} type="submit" style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
              Sign In
            </Button>
          </div>
        </Form>

        <hr />

        {/* <FacebookLoginButton style={{width: "75%"}} onClick={this.facebookLogin} /> */}
        </center>
      </Container>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
