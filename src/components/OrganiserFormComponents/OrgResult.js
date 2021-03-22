import {Button, Form} from "react-bootstrap";
import React from "react";

function OrgResult(props) {
    return <Form.Group>
        <Form.Label column="lg" className="font-weight-bold" style={{fontSize: "150%"}}>Check
            Your Event Details!</Form.Label>
        <h4>Event Name: {props.eventName}</h4>
        <h4>Event Location: {props.location.lat}, {props.location.lng}</h4>
        <h4>Event Date Range: {props.startDate} to {props.endDate} </h4>
        <h4>Number of People: {props.headCount}</h4>
        <h4>Organiser's Email: {props.organiserEmail}</h4>
        {props.eventCode ? <h2>Event Code: {props.eventCode}</h2> : <div/>}
        <Button type="submit" className="btn btn-primary mt-5">Validate</Button>
    </Form.Group>;
}
export {OrgResult}