import {Button, Form} from "react-bootstrap";
import React from "react";

function OrgStep4(props) {
    return <Form.Group>
        <Form.Label column='lg' className='font-weight-bold' style={{fontSize: "150%"}}>How
            many pax will be attending?</Form.Label>
        <Button type='button' style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "x-large",
            backgroundColor: "#D33434",
            borderColor: "#d33434"
        }} onClick={props.onClick}>-</Button>
        <Form.Control required name="headCount" value={props.value} placeholder='2'
                      style={{
                          margin: "20px",
                          width: "160px",
                          height: "160px",
                          display: "inline-block",
                          fontSize: 100,
                          textAlign: "center"
                      }} onChange={props.onChange} readOnly/>
        <Button type='button' style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "x-large",
            backgroundColor: "#d33434",
            borderColor: "#d33434"
        }} onClick={props.onClick1}>+</Button>
        <Form.Text className="text-muted">
            Your number of friends don't define you... or not?
        </Form.Text>
    </Form.Group>;
}
export {OrgStep4}