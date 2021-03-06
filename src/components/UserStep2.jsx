import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateUserAction } from "./updateAction";
import {Button, Form} from "react-bootstrap";
import { Slider } from "./slider";


const UserStep2 = props => {
    const { state, actions } = useStateMachine({ updateUserAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.userDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateUserAction(data);
        push("/user/userStep3");
    };


    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <h>
                        <Slider/>
                    </h>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>What is your name?</Form.Label>
                    <Form.Control required name="someName" type="text" placeholder="Enter cool name here!" ref={register()} />
                    <Form.Text className="text-muted">
                        You can use any name! Just make sure your friends know you!
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default UserStep2;