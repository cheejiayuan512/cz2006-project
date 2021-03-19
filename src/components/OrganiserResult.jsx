import React, { useState , useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { updateOrganiserAction } from "./updateAction";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
// import MakanService from '../services/MakanService';
import axios from "axios";

const OrganiserResult = props => {
    const { state , actions} = useStateMachine({updateOrganiserAction});
    const [submitted, setSubmitted] = useState(false);
    let [eventCode, setEventCode] = useState();

    // const createRoom = () => {
    //     let roomID = Math.random().toString(36).substring(2,10).toUpperCase();
    //     while (MakanService.checkRoomNameAvailable(roomID) || roomID.length!==8) {
    //         roomID = Math.random().toString(36).substring(2,10).toUpperCase();
    //     }
    //     return roomID;
    // }
    const saveRoom = () => {
        const data = state.eventDetails;
        axios
            .post("http://localhost:9000/eventCreation", { eventDetail: data })
            .then((res) => {
                console.log(res.data);
                console.log('function called')
                return res.data;

            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
                console.log(result)
            data['eventCode'] = result;
            actions.updateOrganiserAction(data);

        });



    };

    return (
        <div className="container text-center">
            <h2>Are your details entered correctly?</h2>
            <pre>{JSON.stringify(state.eventDetails, null, 2)}</pre>
            <h2>Your unique event code:<br/> {state.eventDetails.eventCode}</h2>
            <div>
                <Button type='button' onClick={saveRoom}>Create my Makan Event!</Button>
            <p>Thank you for registering, your event has been created. You may proceed with joining the event!</p>
                <Link exact to="/user/userStep1">
                    <button type="button" className="btn btn-primary btn-lg m-3">Join Event</button>
                </Link>
            </div>
        </div>
    );
};

export default OrganiserResult;
