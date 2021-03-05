import React, { Component } from "react";
import {
    Route, MemoryRouter
} from "react-router-dom";
import Home from "./components/Home";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import MainNavbar from "./components/MainNavbar";
import { StateMachineProvider, createStore, useStateMachine } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
createStore({
    "eventDetails": {
        "eventName": "",
        "latitude": "",
        "longitude": "",
        "eventStartDate": "",
        "eventEndDate": "",
        "headCount":1,
        "organiserEmail":"",
    }
})
export function GetHeadCount () {
    const { state } = useStateMachine();
    return state.eventDetails.headCount;
}
export function GetEventDetails () {
    const { state } = useStateMachine();
    return state.eventDetails;
}

function Main() {
        return (
            <StateMachineProvider>
                <DevTool />
            {/*    disabled scroll and set background to white*/}
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
                <div className="content ">
                    <Route exact path="/" component={Home}/>
                    <Route path="/stuff" component={Stuff}/>
                    <Route path="/contact" component={Contact}/>

                </div>
            </div>
            </MemoryRouter>

            </div>
            </StateMachineProvider>
                );

}

export default Main;