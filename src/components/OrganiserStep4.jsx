import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Button, Form} from "react-bootstrap";
import { GetEventDetails } from "../Main";

const OrganiserStep4 = props => {
    let x = parseInt(GetEventDetails().headCount, 10);
    const [numPax, setCount] = useState(x);
    const { state, actions } = useStateMachine({ updateAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(data);
        push("/organiser/organiserStep5");
    };
    const incrementPax = () =>{
        if (numPax<25) {
            setCount(numPax => numPax + 1);
        }
    }
    const decrementPax = () =>{
        if (numPax>=2) {
            setCount(numPax => numPax - 1);
        }
    }

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>How many pax will be attending?</Form.Label>
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#D33434',borderColor:'#D33434'}} onClick={decrementPax}>-</Button>
                    <Form.Control required name="headCount" value={numPax} placeholder='1'
                                  style={{margin:'20px', width: '160px',height: '160px',display: 'inline-block', fontSize:100,textAlign:'center'}} ref={register()} readOnly />
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#d33434',borderColor:'#d33434'}} onClick={incrementPax}>+</Button>
                    <Form.Text className="text-muted">
                        Your number of friends don't define you... or not?
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary m-2" type="button" as={Link} to='/organiser/organiserStep3' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default OrganiserStep4;