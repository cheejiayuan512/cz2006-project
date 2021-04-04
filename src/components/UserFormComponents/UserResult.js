import {Button, Form} from "react-bootstrap";
import React from "react";

export const UserResult = (props) =>{
    return <Form.Group>
        <Form.Label column="lg" className="font-weight-bold"
                    style={{fontSize: "150%"}}>Check Your Event
            Details!</Form.Label>
        <h4>Preferred Name: {props.userName}</h4>
        <h4>Preferred Timings: {props.userTiming}</h4>
        <h4>Preferred Budget: {props.userBudget.toString()} </h4>
        <h4>Preferred Cuisine(s): {props.userCuisine.toString()}</h4>
        {props.userMessage == ''? <a/> : <h4>{props.userMessage}</h4>}


    </Form.Group>;
}