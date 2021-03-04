import React from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Button, Form} from "react-bootstrap";
// import Counter from "./Counter";

const Step5 = props => {
    const { state, actions } = useStateMachine({ updateAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(data);
        push("/contact/Step6");
    };

    return (
        <div className='justify-content-center text-center align-items-center'>
            <h1>How many pax will be attending?</h1>
            {/*<Counter className='numPax'/>*/}
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Text required name="headCount2" value={'numPax'.state.getCount} ref={register()} />
                    <Form.Control required name="headCount1" type="number" ref={register()} />
                    <Form.Text className="text-muted">
                        Your number of friends don't define you... somewhat?
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary m-2" type="button" as={Link} to='/contact/step4' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default Step5;