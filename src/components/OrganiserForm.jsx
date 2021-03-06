import React, {Component} from "react";
import {
MemoryRouter,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import OrganiserStep1 from "./OrganiserStep1";
import OrganiserStep2 from "./OrganiserStep2";
import OrganiserStep3 from "./OrganiserStep3";
import OrganiserStep4 from "./OrganiserStep4";
import OrganiserStep5 from "./OrganiserStep5";
import OrganiserResult from "./OrganiserResult";
import {Nav, Navbar} from "react-bootstrap";


class OrganiserForm extends Component {
    render() {
        return (
            <>
                <div>
                    <Navbar bg="dark" variant='dark' expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="m-auto">
                                <Nav.Link as={Link} to="/organiser/organiserStep1"> Step 1 </Nav.Link>
                                <Nav.Link as={Link} to="/organiser/organiserStep2"> Step 2 </Nav.Link>
                                <Nav.Link as={Link} to="/organiser/organiserStep3"> Step 3 </Nav.Link>
                                <Nav.Link as={Link} to="/organiser/organiserStep4"> Step 4 </Nav.Link>
                                <Nav.Link as={Link} to="/organiser/organiserStep5"> Step 5 </Nav.Link>
                                <Nav.Link as={Link} to="/organiser/organiserResult"> Result </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/organiser/organiserStep1" component={OrganiserStep1}/>
                    <Route path="/organiser/organiserStep2" component={OrganiserStep2}/>
                    <Route path="/organiser/organiserStep3" component={OrganiserStep3}/>
                    <Route path="/organiser/organiserStep4" component={OrganiserStep4}/>
                    <Route path="/organiser/organiserStep5" component={OrganiserStep5}/>
                    <Route path="/organiser/organiserResult" component={OrganiserResult}/>
                </div></>
        );
    }
}


export default OrganiserForm;