import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Button, Form} from "react-bootstrap";
const Step6 = props => {
    const { state, actions } = useStateMachine({ updateAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(data);
        push("/contact/Result");
    };

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Enter your email address to be notified!</Form.Label>
                    <Form.Control required name="eventEmail" type="email" placeholder="Enter an email here!" ref={register()} />
                    <Form.Text className="text-muted">
                        Choose something fun!
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default Step6;