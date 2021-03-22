import {Form} from "react-bootstrap";
import React from "react";

function OrgStep5(props) {
    return <Form.Group>
        <Form.Label
            column="lg"
            className="font-weight-bold"
            style={{fontSize: "150%"}}
        >
            Enter your email address to be notified!
        </Form.Label>
        <Form.Control
            required
            name="organiserEmail"
            type="email"
            placeholder="Enter an email here!"
            onChange={props.onChange}
        />
        <Form.Text className="text-muted">
            Please use a real email to prove that you are a real person with
            real friends!
        </Form.Text>
    </Form.Group>;
}
export {OrgStep5}