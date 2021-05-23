import { db } from '../firebase/firebase';
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Container } from "reactstrap";
import { auth } from '../firebase/firebase';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
});

const DataFillFrom = () => {
    return (
      <div className="div-flex" style={{backgroundColor: "white"}}>
        <center>
            <DataFillFromBase />
        </center>
      </div>
    );
};
  
  const INITIAL_STATE = {
    info: "",
    city: "",
    error: null
  };
  
  class DataFillFromBase extends Component {
    state = { ...INITIAL_STATE };
  
    onSubmit = event => {
        const { info, city } = this.state;
        const currdate = new Date();
        const dateformat = currdate.getDate() + "/" + currdate.getMonth() + "/" + currdate.getFullYear();
          db.ref(city.toUpperCase() + '/' + auth.currentUser.uid).push().set({
            info: info,
            date: dateformat
          }).then(() => {
            db.ref('users/' + auth.currentUser.uid).once('value', (snapshot) => {
              db.ref('posts').push().set({
                info: info,
                date: dateformat,
                name: snapshot.val().username,
                city: city
              })  
            })
          }).then(() => {
            alert("Thank you!\nWe have received your information.");
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
              alert(error);
          });
          event.preventDefault();
    };
  
    render() {
      const { city, info, error} = this.state;
      const isInvalid = city === "" || info === "";
  
      return (<Container id="dataform">
          <center>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                <Label for="City" style={{color: "black", fontSize:"22px"}} >City</Label>
                <Input style={{width:"75%", fontSize:"22px"}}
                    type="text"
                    name="city"
                    placeholder="Your current location"
                    required
                    value={city}
                    onChange={event =>
                    this.setState(byPropKey("city", event.target.value))
                    }
                    />
                </FormGroup>
                <FormGroup>
                <Label for="Resource" style={{color: "black", fontSize:"22px"}} >Resource</Label>
                <Input style={{width:"75%", fontSize:"22px", height: "250px"}}
                    type="textarea"
                    name="info"
                    placeholder="Write your infomation, let others to know (eg: Left out medicines, prescription, relief creams, vitamins and other resources etc...)"
                    required
                    value={info}
                    onChange={event =>
                    this.setState(byPropKey("info", event.target.value))
                    }
                    />
                </FormGroup>
                <div className="text-center">
                <Button type="submit" disabled={isInvalid} style={{backgroundColor: "darkblue", color: "white", fontSize:"20px"}}>
                    Submit
                </Button>
                </div>
            </Form>
          </center>
        </Container>
      );
    }
  }
  
  
export default DataFillFrom;

