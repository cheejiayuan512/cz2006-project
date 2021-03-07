import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { updateOrganiserAction } from "./updateAction";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import MakanService from '../services/MakanService';

const OrganiserResult = props => {
    const { state } = useStateMachine({updateOrganiserAction});
    const [submitted, setSubmitted] = useState(false);

    const createRoom = () => {
        let roomID = Math.random().toString(36).substring(2,10).toUpperCase();
        while (MakanService.checkRoomNameAvailable(roomID) || roomID.length!=8) {
            roomID = Math.random().toString(36).substring(2,10).toUpperCase();
        }
        return roomID;
    }

    const saveRoom = () => {
        const data = state.eventDetails;
        data['roomID'] = createRoom();
        MakanService.create(data)
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
                <Button onClick={saveRoom}>Create my Makan Event!</Button>
            <p>Thank you for registering, your event has been created. You may proceed with joining the event!</p>
                <Link exact to="/user/userStep1">
                    <button type="button" className="btn btn-primary btn-lg m-3">Join Event</button>
                </Link>
            </div>
        </div>
    );
};

export default OrganiserResult;
