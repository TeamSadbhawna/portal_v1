import React, { Component } from "react";
import withAuthorization from "./withAuthorization";
import { db } from "../firebase";
import Scrollreact from '../scroll';
import Datareact from '../data';
import Visionreact from '../vision';
import Aboutreact from '../about';
import Navigation from "./Navigation";

class HomePage extends Component {
  state = {
    users: null,
    username: "",
    loading: true
  };

  componentDidMount() {
    
    const { loggedUser } = this.props;
    db.doGetAnUnser(loggedUser.uid).then(res => {
      this.setState({
        username: res.val().username,
        loading: false
      });
    });
  }

  render() {
    const { users, username, loading } = this.state;
    return (
      <div style={{backgroundColor: "black"}}>
        <Navigation />
        <Scrollreact />
        <Datareact />
        <Visionreact />
        <Aboutreact />
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage); //grants authorization to open endpoint if an user is signed in
