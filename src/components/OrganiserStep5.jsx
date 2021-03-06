import React from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateOrganiserAction } from "./updateAction";
import {Button, Form} from "react-bootstrap";
const OrganiserStep5 = props => {
    const { state, actions } = useStateMachine({ updateOrganiserAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateOrganiserAction(data);
        push("/organiser/organiserResult");
    };

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Enter your email address to be notified!</Form.Label>
                    <Form.Control required name="organiserEmail" type="email" placeholder="Enter an email here!" ref={register()} />
                    <Form.Text className="text-muted">
                        Please use a real email to prove that you are a real person with real friends!
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary m-2" type="button" as={Link} to='/organiser/organiserStep4' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default OrganiserStep5;