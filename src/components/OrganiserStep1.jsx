import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Button, Form} from "react-bootstrap";
const OrganiserStep1 = props => {
    const { state, actions } = useStateMachine({ updateAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(data);
        push("/organiser/organiserStep2");
    };

    return (
        <div className='justify-content-center text-center align-items-center'>
        <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Let's get started! What is your event name?</Form.Label>
                <Form.Control required name="eventName" type="text" placeholder="Finals Bojio??!" ref={register()} />
                <Form.Text className="text-muted">
                    Choose something fun!
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">Next!</Button>
        </Form>
        </div>
    );
};

export default OrganiserStep1;
