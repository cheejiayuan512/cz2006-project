import React from "react";
import { useStateMachine } from "little-state-machine";
import { updateUserAction } from "../../controllers/updateAction";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
// import firebase from "firebase/app";
//
// const tutorialsRef = firebase.database().ref("/tutorials");

const UserResult = props => {
    const { state } = useStateMachine({updateUserAction});

    return (
        <div className="container text-center">
            <h2>Are your details entered correctly?</h2>
            <pre>{JSON.stringify(state.userDetails, null, 2)}</pre>
            <div>
                <p>Thank you for registering, your event has been created. You may proceed with joining the event!</p>
                <Link exact to="/">
                    <button type="button" className="btn btn-primary btn-lg m-3">Join Event</button>
                </Link>
            </div>
        </div>
    );
};

export default UserResult;
