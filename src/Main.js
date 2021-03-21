import React, { Component } from "react";
import {
    Route, MemoryRouter
} from "react-router-dom";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import OrganiserForm from "./components/OrganiserForm";
import TestingForm from "./components/TestingForm.js";
import MainNavbar from "./components/MainNavbar";
import {Button} from "react-bootstrap";
import {config} from './secret.js'
import {RestaurantSlider} from "./services/GoogleAPIService";
import MakanGoWhereLogo from "./assets/MakanGoWhereLogo";
import {createStore, useStateMachine} from "little-state-machine";

let today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const startDate = (today.getMonth() + 1).toString().padStart(2,'0') + '/' + today.getDate().toString().padStart(2,'0') + '/' + today.getFullYear();
const tempDate = new Date(year, month, day  + 4);
const endDate = (tempDate.getMonth() + 1).toString().padStart(2,'0') + '/' + tempDate.getDate().toString().padStart(2,'0') + '/' + tempDate.getFullYear();

createStore({
    "eventDetails": {
        "eventName": "",
        "latitude": "1.35",
        "longitude": "103.8198",
        "eventStartDate": startDate,
        "eventEndDate": endDate,
        "headCount": 1,
        "organiserEmail": "",
    },
    "userDetails": {
        "roomID": "",
        "userName": "",
        "userTiming": "",
        "longitude": "",
        "eventTiming": "",
        "eventEndDate": "",
        "headCount": 1,
        "organiserEmail": "",
    }
})

export function GetEventDetails () {
    const { state } = useStateMachine();
    return state.eventDetails;
}
export function GetUserDetails () {
    const { state } = useStateMachine();
    return state.userDetails;
}

function Main() {

    return (<div>
            <HomePage />
            </div>
    );
}

function HomePage() {
    return(
        <div className='App' style={{ height: "100vh", background: "#ffffff" ,margin: 0, overflow: 'hidden'}} >
            <MemoryRouter>
                <div><MainNavbar></MainNavbar></div>
                <div style={{
                    height: "100vh",
                    backgroundSize: 'contain',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url("https://www.smartnation.gov.sg/images/default-source/module/home-base-item/cb0c06c1-cfc1-48a9-84ae-7909e93cf716.jpg" )`
                }}>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/user" component={UserForm}/>
                        <Route path="/organiser" component={OrganiserForm}/>
                        <Route path='/testing' component={TestingForm}/>
                    </div>

                </div>
            </MemoryRouter></div>)
}
export default Main;