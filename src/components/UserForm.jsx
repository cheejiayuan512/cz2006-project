import UserStep1 from "./UserStep1";
import UserStep2 from "./UserStep2";
import UserStep3 from "./UserStep3";
import UserStep4 from "./UserStep4";
import UserStep5 from "./UserStep5";
import UserResult from "./UserResult";
import {Nav, Navbar} from "react-bootstrap";
import {Link, Route} from "react-router-dom";
import React, { Component } from "react";


class UserForm extends Component {
    render() {
        return (
            <>
                <div>
                    <Navbar bg="dark" variant='dark' expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="m-auto">
                                <Nav.Link as={Link} to="/user/userStep1"> Step 1 </Nav.Link>
                                <Nav.Link as={Link} to="/user/userStep2"> Step 2 </Nav.Link>
                                <Nav.Link as={Link} to="/user/userStep3"> Step 3 </Nav.Link>
                                <Nav.Link as={Link} to="/user/userStep4"> Step 4 </Nav.Link>
                                <Nav.Link as={Link} to="/user/userStep5"> Step 5 </Nav.Link>
                                <Nav.Link as={Link} to="/user/userResult"> Result </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/user/userStep1" component={UserStep1}/>
                    <Route path="/user/userStep2" component={UserStep2}/>
                    <Route path="/user/userStep3" component={UserStep3}/>
                    <Route path="/user/userStep4" component={UserStep4}/>
                    <Route path="/user/userStep5" component={UserStep5}/>
                    <Route path="/user/userResult" component={UserResult}/>
                </div></>
        );
    }
}

export default UserForm;
