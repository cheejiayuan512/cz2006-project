import React, { Component } from "react";
import {
    Route, MemoryRouter
} from "react-router-dom";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed
} from "@react-firebase/auth";
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import Home from "./components/Home";
// import UserForm from "./components/UserForm";
import OrganiserForm from "./components/OrganiserForm";
import MainNavbar from "./components/MainNavbar";
import { StateMachineProvider, createStore, useStateMachine } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import {Button} from "react-bootstrap";
import {config} from './secret.js'
import MakanGoWhereLogo from "./assets/MakanGoWhereLogo";
firebase.app()

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
    return (<div>
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <div>
            <IfFirebaseAuthed>
                {() => (
                    <div>

                        <HomePage />
                    </div>
                )}
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
                {({ firebase }) => (
                    <div className='align-items-center justify-content-center text-center'>
                        <MakanGoWhereLogo/>
                        <h2>Sign in to join or create events! </h2>
                        <Button type='button'
                            onClick={() => {
                                firebase
                                    .app()
                                    .auth()
                                    .signInAnonymously();
                            }}
                        >
                            Sign in anonymously
                        </Button>
                    </div>
                )}
            </IfFirebaseUnAuthed>
            </div>
        </FirebaseAuthProvider>
        </div>
    );
}

function HomePage() {
    return(<StateMachineProvider>
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
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        {/*<Route path="/user" component={UserForm}/>*/}
                        <Route path="/organiser" component={OrganiserForm}/>
                    </div>

                </div>
            </MemoryRouter>

        </div>
    </StateMachineProvider>)
}
export default Main;