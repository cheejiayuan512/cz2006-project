import React, {Component} from "react";
import ReactDOM from "react-dom";
import {
MemoryRouter,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Result from "./Result";
import {Nav, Navbar} from "react-bootstrap";


const Contact = () => {
        return (
                <>
                    <div >
                        <Navbar bg="dark" variant='dark' expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="m-auto">
                                    <Nav.Link as={Link} to="/contact">Step 1</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/step2">Step 2</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/step3">Step 3</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/step4">Step 4</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/step5">Step 5</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/step6">Step 6</Nav.Link>
                                    <Nav.Link as={Link} to="/contact/result">Result</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    <Route exact path="/contact" component={Step1} />
                    <Route path="/contact/step2" component={Step2} />
                    <Route path="/contact/step3" component={Step3} />
                    <Route path="/contact/step4" component={Step4} />
                    <Route path="/contact/step5" component={Step5} />
                    <Route path="/contact/step6" component={Step6} />
                    <Route path="/contact/result" component={Result} />
                    </div>
                </>
        );
}


export default Contact;