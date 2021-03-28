import {Form} from "react-bootstrap";
import React from "react";

function UserStep1(props) {
    return <Form.Group>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>Let's get started! What is your
            name?</Form.Label>
        <Form.Control required name="userName" type="text" placeholder="Bob Bob??!"
                      value={props.value} onChange={props.onChange}/>
        <Form.Text className="text-muted">

        </Form.Text>
    </Form.Group>;
}

export {UserStep1}