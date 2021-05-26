// Style sheets
import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import { db } from './firebase/firebase';
import React, { Component } from "react";
import { ListGroup, Card } from 'react-bootstrap';

const Datareact = () => {
    return (
      <div className="div-flex">
        <center>
            <DatareactBase />
        </center>
      </div>
    );
};

class DatareactBase extends Component {
    state = {posts: []};
    componentWillMount(){
        db.ref('posts').limitToLast(100).once('value', (snapshot) => {          
            if (snapshot.val()) {
                snapshot.forEach(childsnap => {
                    let temp = this.state.posts;
                    this.setState({ posts: [...temp, childsnap.val()]});
                })
            }
            console.log(this.state);
        }).catch(e => {
            alert(e.message);
        })
    }

    render() {
        return  <div style={{ backgroundColor: "black"}}>
                    <section className="about-section mt-5" id="resources">
                        <div className="container">
                            <div className="text-center">
                                <h1 className="section-heading text-uppercase">Resources</h1>
                                <h4 style={{color:"white"}}>Always refer to doctor first</h4>
                                <hr></hr>
                                <section className="about">
                                <div className="container-fluid" style={{ backgroundColor: "black"}}>
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-6 d-flex justify-content-center align-items-stretch" data-aos="fade-right">
                                            <img id="res-img" src="./images/hand.jpg" class="img-fluid" alt="" />
                                        </div>
                                            <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">

                                                <h2 style={{color:"white"}} >It is health that is the real wealth, and not pieces of gold and silver.” – Mahatma Gandhi</h2>
                                                <h1 style={{color:"white"}}>Let's fight togather!</h1>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <ListGroup style={{ backgroundColor: "black"}} >
                                <h2 style={{color:"white", textAlign: "center"}}>Recent Posts</h2>
                                { this.state.posts.map(res => {
                                    return  <ListGroup.Item style={{ backgroundColor: "black"}}>
                                        <Card style={{width: "80%", backgroundColor: "black", color: "white", padding: "10px"}}>
                                            <Card.Body>
                                                <h4>{res.name}</h4>
                                                <Card.Title>{res.city} on {res.date}</Card.Title>
                                                <Card.Text>
                                                    {res.info}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <br/>
                                </ListGroup.Item>
                                })
                                }
                            </ListGroup>        
                        </div>
                    </section>
                </div>;
    }
};

export default Datareact;