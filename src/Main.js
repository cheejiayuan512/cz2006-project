import React, {Component, useState} from "react";
import {
    Route, MemoryRouter
} from "react-router-dom";
import Home from "./pages/Home";
import OrgForm from "./pages/OrgForm.js";
import MainNavbar from "./components/MainNavbar";
import {Button} from "react-bootstrap";
import {config} from './configurations/secret.js'
import {RestaurantSlider} from "./services/GoogleAPIService";
import MakanGoWhereLogo from "./assets/MakanGoWhereLogo";
import {createStore, useStateMachine} from "little-state-machine";
import {UserForm} from "./pages/UserForm";
import {RouterConfig} from "./navigation/RouterConfig";

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

const Main =() => {

    return (<div>
            <HomePage />
            </div>
    );
}



function HomePage() {
    const [eventCode , setEventCode] = useState()
    return(

        <div className='App' style={{height: "100vh", background: "#ffffff", margin: 0, overflow: 'hidden'}}>
            <MemoryRouter>
                <div><MainNavbar></MainNavbar></div>
                <div style={{
                    height: "100vh",
                    backgroundSize: 'contain',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url("https://www.smartnation.gov.sg/images/default-source/module/home-base-item/cb0c06c1-cfc1-48a9-84ae-7909e93cf716.jpg" )`
                }}>
                    <RouterConfig render={(props) => (
                        <Home {...props} setEventCode={setEventCode}/>
                    )} render1={(props) => (<UserForm {...props} eventCode={eventCode}/>)}/>

                </div>
            </MemoryRouter></div>)
}
export default Main;