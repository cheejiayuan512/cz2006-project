import React, {Component} from "react";
import {Button, Form, FormControl,Container,Row,Col} from "react-bootstrap";
import {Link, Route} from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import {UserForm} from "./UserForm";

class Home extends Component {

    constructor() {
        super();
        this.state = { eventCode:'',
            errorMsg:'',
            restaurants:'',
        }
        this.handleEventCode = this.handleEventCode.bind(this)
        this.handleRestaurants = this.handleRestaurants.bind(this)
    }


    clickSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.eventCode);
        axios.post("http://localhost:9000/verifySessID", {eventDetail:this.state.eventCode})
            .then((res) => {
                console.log('object' ,res);
                console.log(res.data);
                const eventValidityPromise = res.data;
                if (eventValidityPromise === 'Room is full.') {
                    this.setState({errorMsg:'The room is full!'})
                    this.props.history.push("/result");

                }
                else if (eventValidityPromise === 'Invalid event code.'){
                    this.setState({errorMsg:'Invalid/misspelled event code!'})


                }
                else if (eventValidityPromise === 'Valid.'){
                    this.setState({errorMsg:'Well done!'})
                    this.props.history.push("/usertesting");
                }
                else {
                    this.setState({errorMsg:'Uhoh, something went wrong!'})
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {


    return (
            <div className="w-responsive text-center" style={{fontSize:'2vh'}}>
                <h2 >Who are we?</h2>
                <p className='w-50 d-inline-flex' >We are a team of NTU students who are constantly frustrated at the amount of work we have to put
                in order to get together for a meal with friends. So, we decided to make this webapp which aims to
                optimise this process!</p>
                <Container fluid className="pt-2 pl-5 pr-5 justify-content-md-center"  >
                    <Row >
                        <Col>
                            <p className="text-center font-weight-bold">Have a code?</p>
                            <div className="d-flex justify-content-center">
                            <Form inline className='justify-content-center' required>
                                <Row>
                                    <Col>
                            <Form.Control required type="text" placeholder="Your Event Code"  className='m-3' name="eventCodeField" onChange={this.handleEventCode}/>
                            <p className={'text-info'}>{this.state.errorMsg}</p>
                                    </Col>

                                    <Col>
                            <Button onClick={this.clickSubmit}  className="m-3">Join Event</Button>
                                    </Col>
                                </Row>
                            </Form>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p className="text-center font-weight-bold">Want to create an event? </p>
                            <Link exact to="/testing">
                                <Button type="button">Create New Event</Button>
                            </Link>
                        </Col>
                        </Row>
                    {/*<RestaurantSlider lat={1.35} long={103.8198} radius={5000} text={'hello'} keyWord={'fast+food'} onChange={this.handleRestaurants}/>*/}
                </Container>

        </div>

        );

    }

    handleEventCode(event) {
        this.setState({eventCode:event.target.value})
        this.props.setEventCode(event.target.value)
    }
    handleRestaurants(event) {
        this.setState({restaurants: event.currentTarget.id  }, console.log(this.state))
    }
}

export default withRouter(Home);