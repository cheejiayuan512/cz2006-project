import {Form} from "react-bootstrap";
import React from "react";

function OrgStep1(props) {
    return <Form.Group>
        <Form.Label column='lg' className='font-weight-bold' style={{fontSize: "150%"}}>Let's get started! What is your
            event name?</Form.Label>
        <Form.Control required name="eventName" type="text" placeholder="Finals Bojio??!" value={props.value}
                      onChange={props.onChange}/>
        <Form.Text className="text-muted">
            Choose something fun!
        </Form.Text>
    </Form.Group>;
}
export {OrgStep1};