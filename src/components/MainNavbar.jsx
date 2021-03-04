import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import {
    Route,
    NavLink,
} from "react-router-dom";
import MakanGoWhereLogo from '../../src/assets/MakanGoWhereLogo.jsx';


class MainNavbar extends Component {
    render() {
        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-justified ml-auto mr-auto align-items-center">
                        <Navbar.Brand as={NavLink} exact to="/"><MakanGoWhereLogo></MakanGoWhereLogo></Navbar.Brand>

                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MainNavbar;