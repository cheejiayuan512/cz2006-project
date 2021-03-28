import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateUserAction } from "../../controllers/updateAction";
import {Button, Form} from "react-bootstrap";
import { GetEventDetails } from "../../Main";
import ReactWordcloud from 'react-wordcloud';

const UserStep4 = props => {
    let x = parseInt(GetEventDetails().headCount, 10);
    const cuisineList = ['chinese', 'japanese','mexican', 'malay', 'indian', 'dessert', 'cafe',
        'korean', 'western', 'peranakan', 'nyonya', 'hawker', 'italian', 'german', 'french',
        'spanish', 'thai', 'vietnamese', 'fast+food','bakery','']
    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [5, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };
    const [numPax, setCount] = useState(x);
    const { state, actions } = useStateMachine({ updateUserAction });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.userDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateUserAction(data);
        push("/user/userStep5");
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
                    <ReactWordcloud options={options} words={}/>
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#D33434',borderColor:'#D33434'}} onClick={decrementPax}>-</Button>
                    <Form.Control required name="headCount" value={numPax} placeholder='1'
                                  style={{margin:'20px', width: '160px',height: '160px',display: 'inline-block', fontSize:100,textAlign:'center'}} ref={register()} readOnly />
                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#d33434',borderColor:'#d33434'}} onClick={incrementPax}>+</Button>
                    <Form.Text className="text-muted">
                        Your number of friends don't define you... or not?
                    </Form.Text>
                </Form.Group>

                <Button variant="secondary m-2" type="button" as={Link} to='/user/userStep3' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default UserStep4;