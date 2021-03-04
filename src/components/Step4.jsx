import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Button, Form} from "react-bootstrap";

const Step4 = props => {
    const [numPax, setCount] = useState(1);
    const { state, actions } = useStateMachine({ updateAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(data);
        push("/contact/Step6");
    };
    const incrementPax = () =>{
        setCount(numPax => numPax + 1);
        // this.state = numPax;
    }
    const decrementPax = () =>{
        if (numPax>=2) {
            setCount(numPax => numPax - 1);
            // this.state = numPax;
        }
    }

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>How many pax will be attending?</Form.Label>
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#D33434',borderColor:'#D33434'}} onClick={decrementPax}>-</Button>
                    <Form.Control required name="headCount" value={numPax} placeholder={numPax}
                                  style={{margin:'20px', width: '160px',height: '160px',display: 'inline-block', fontSize:100,textAlign:'center'}} ref={register()} readOnly />
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#d33434',borderColor:'#d33434'}} onClick={incrementPax}>+</Button>
                    <Form.Text className="text-muted">
                        Your number of friends don't define you... somewhat?
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary m-2" type="button" as={Link} to='/contact/step3' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default Step4;