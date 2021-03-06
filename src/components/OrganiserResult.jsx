import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { updateOrganiserAction } from "./updateAction";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import TutorialDataService from '../services/MakanService';

const OrganiserResult = props => {
    const { state } = useStateMachine({updateAction});
    const [submitted, setSubmitted] = useState(false);

    const saveTutorial = () => {
        const data = state;

        TutorialDataService.create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="container text-center">
            <h2>Are your details entered correctly?</h2>
            <pre>{JSON.stringify(state.eventDetails, null, 2)}</pre>
            <div>
                <Button onClick={saveTutorial}>Create my Makan Event!</Button>
            <p>Thank you for registering, your event has been created. You may proceed with joining the event!</p>
                <Link exact to="/user/userStep1">
                    <button type="button" className="btn btn-primary btn-lg m-3">Join Event</button>
                </Link>
            </div>
        </div>
    );
};

export default OrganiserResult;
