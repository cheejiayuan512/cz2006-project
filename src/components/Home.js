import React, {Component, useState} from "react";
import {Button, Form, FormControl,Container,Row,Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [validated, setValidated] = useState(false);
    const [eventCode , setEventCode] = useState();

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        console.log(eventCode.value);
        if (form.checkValidity() === false || checkCode(eventCode.value)) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

    };
    const checkCode = (data) => {
        return axios
            .post("http://localhost:9000/verifySessID", { eventDetail: data })
            .then((res) => {
                console.log(res.data);
                console.log('function called')
                return res.data;

            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
                console.log(result)

            });

    }

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
                            <Form inline className='justify-content-center' noValidate validated={validated} onClick={handleSubmit}>
                            <Form.Control required type="text" placeholder="Your Event Code"   name="eventCodeField" ref={code => (setEventCode(code))}/>
                            <Form.Control.Feedback type="invalid">
                                    Please enter a valid event code.
                                </Form.Control.Feedback>
                            <button type={"submit"} className="btn btn-primary btn-lg m-3 ">Join Event</button>
                            </Form>
                            </div>
                        </Col>
                        <Col>
                            <p className="text-center font-weight-bold">Want to create an event? </p>
                            <Link exact to="/organiser/organiserStep1">
                                <Button type="button" className="btn btn-secondary btn-lg m-3">Create New Event</Button>
                            </Link>
                        </Col>
                    </Row>

                </Container>
            </div>

        );

}

export default Home;