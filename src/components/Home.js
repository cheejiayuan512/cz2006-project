import React, { Component } from "react";
import {Button, Form, FormControl,Container,Row,Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="w-responsive text-center">
                <h2 >Who are we?</h2>
                <p className='w-50 d-inline-flex'>We are a team of NTU students who are constantly frustrated at the amount of work we have to put
                in order to get together for a meal with friends. So, we decided to make this webapp which aims to
                optimise this process!</p>
                <Container fluid className="pt-2 pl-5 pr-5">
                    <Row className="justify-content-md-center">
                        <Col>
                            <p className="text-center font-weight-bold">Have a code?</p>
                            <div className="d-flex justify-content-center">
                            <Form inline className='justify-content-center'>
                            <FormControl type="text" placeholder="Your Event Code" />
                            <Link exact to="/user/userStep1">
                                <button type="button" className="btn btn-primary btn-lg m-3 ">Join Event</button>
                            </Link>
                            </Form>
                            </div>
                        </Col>
                        <Col>
                            <p className="text-center font-weight-bold">Want to create an event? </p>
                            <Link exact to="/organiser/organiserStep1">
                                <button type="button" className="btn btn-secondary btn-lg m-3">Create New Event</button>
                            </Link>
                        </Col>
                    </Row>

                </Container>
            </div>

        );
    }
}

export default Home;