import React, { Component, useState } from "react";
import AuthUserContext from "./AuthUserContext";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization"; //redirects to sign in if user not signed in
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import { Container } from "reactstrap";
import { Button } from 'reactstrap';
import { db, auth } from '../firebase/firebase';
import DataFillFrom from './FirestoreOp';
import Aboutreact from '../about';
import { Table } from 'react-bootstrap';

const INITIAL_STATE = {
  city: "",
  username: "",
  phone: "",
  email: "",
  info: [],
  error: null
};

const tablestyle = {color:"black", fontSize: "18px", fontWeight: "bold"};

class AccountPage extends Component {
  //authUser is passed down via Context API (It is set at withAuthentication.js file)

  state = {...INITIAL_STATE};

  componentWillMount() {
    db.ref('users/' + auth.currentUser.uid).once('value').then((snapshot) => {
      if (snapshot) {
        this.setState(snapshot.val());
      }
    }).then( () => {
      db.ref(this.state.city + '/' + auth.currentUser.uid).once('value', (snapshot) => {
        if (snapshot) {
            snapshot.forEach( element => {
              console.log(element.val(), element.key);
              let temp = this.state.info;
              this.setState( {info: [...temp, element.val()]});
            })
        }
      })
    }).catch( e => {
      alert(e.message);
    })
  }

  render() {
    return <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <Container>
          <center>
            <div className="div-flex">
              <img className="authlogo" style={{height: "55px"}} src="./images/logobanner.png" alt="My logo" />
              <hr/>
                <Button style={{fontSize: "18px", backgroundColor: "#1f76bd", height:"40px"}}><Link to={routes.HOME} style={{fontSize: "18px", color: "white", textDecoration: "none"}} >Go back to home</Link></Button>
              <div>
                <h2>Your Details</h2>
                <Table responsive className="table table-hover table-bordered" style={{width: "450px"}}>
                  <tr scope="row" className="bg-success">
                      <td style={tablestyle}>Name:</td>
                      <td style={{ fontSize: "18px"}}>{this.state.username}</td>
                  </tr>
                  <tr scope="row" className="bg-success">
                      <td style={tablestyle}>Email:</td>
                      <td style={{ fontSize: "18px"}}>{this.state.email}</td>
                  </tr>
                  <tr scope="row" className="bg-success" >
                      <td style={tablestyle}>Contact:</td>
                      <td style={{ fontSize: "18px"}}>{this.state.phone}</td>
                  </tr>
                  <tr scope="row" className="bg-success" >
                      <td style={tablestyle}>Address:</td>
                      <td style={{ fontSize: "18px"}}>{this.state.city[0] + this.state.city.substr(1).toLowerCase()}</td>
                  </tr>
                </Table>
                <center>
                  <h2>Your Contribution</h2>
                    <table className="table table-hover table-bordered" style={{width: "75%"}} >
                      <thead style={{textAlign: "center"}}>
                          <tr className=" bg-dark" style={{color:"black", fontSize: "18px", fontWeight: "bold"}}>
                              <th scope="col">DATE</th>
                              <th scope="col">RESOURCES</th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.info.map(element => {
                            return <tr scope="row" className="bg-success">
                              <td>{element.date}</td>
                              <td>{element.info}</td>  
                            </tr>
                          })
                        }
                      </tbody>
                    </table>
                </center>
                <h3> Just fill out the given form, your given information will be displayed in Resources section shortly.</h3>
                <DataFillFrom />
                <h3 className="centered">
                  Change your Password: {authUser.email}
                </h3>
                {/* disabling password changes/resets if user is logged in through facebook */}
                {authUser.providerData[0].providerId === "facebook.com" ? null : (
                  <center>
                    <PasswordChangeForm />
                  </center>
                )}
              </div>
            </div>
          </center>
          </Container>
        )}
      </AuthUserContext.Consumer>
      <hr/>
      <br/>
      <Aboutreact />
    </div>
  }
};

const authCondition = authUser =>
  !!authUser && authUser.providerData[0].providerId !== "facebook.com"; //true and false

export default withAuthorization(authCondition)(AccountPage);
