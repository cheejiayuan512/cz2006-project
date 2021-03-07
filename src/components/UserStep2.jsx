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

    class DateRangeHelper extends React.Component {
        constructor() {
            super();
            this.state = { show: false };
        }
        _toggle = (bool) => {
            if (this.state.show == false) {
                this.setState({
                    show: true
                });
            } else {
                this.setState({
                    show: false
                });
            }
        }
        render() {
            return (
                <div>
                    <br/>
                    <Button className='m-4' type='button' onClick={this._toggle.bind(null, true)}> Add another </Button>
                    { this.state.show && (<div><Slider name={'date' + 'TimingAvailable'} /></div>) }
                </div>
            )
        }
    }
    class DateRange extends React.Component {
        constructor() {
            super();
            this.state = { show: false }
        }
        _toggle = (bool) => {
            if (this.state.show == false) {
                this.setState({
                    show: true
                });
            } else {
                this.setState({
                    show: false
                });
            }
        }
        render() {
            return (
                <div>
                    <Button className='m-4' type='button' onClick={this._toggle.bind(null, true)}> Show/Hide </Button> // not using
                    { this.state.show && (<div> <Slider className='m-4' name={'date' + 'TimingAvailable'} /> <DateRangeHelper/> </div>) }
                </div>
            )
        }
    }

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>What is your name?</Form.Label>
                    <div>
                        <h1/>
                        <DateRange/>
                    </div>

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