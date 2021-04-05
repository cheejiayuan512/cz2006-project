import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";

import UserPrice from '../components/UserFormComponents/UserPrice';
import {OrgStep1} from "../components/OrganiserFormComponents/OrgStep1";
import {OrgStep2} from "../components/OrganiserFormComponents/OrgStep2";
import {OrgStep3} from "../components/OrganiserFormComponents/OrgStep3";
import {OrgStep4} from "../components/OrganiserFormComponents/OrgStep4";
import {OrgStep5} from "../components/OrganiserFormComponents/OrgStep5";
import {OrgResult} from "../components/OrganiserFormComponents/OrgResult";
import {handleChange, decrementPax, incrementPax, handleChangeDate, MapData, onSubmit} from "../controllers/OrgFormController";


const FormStep = (props) => {
    return <div className="step" data-target={props.dataTarget}>
        <button className="step-trigger">
            <span className="bs-stepper-circle">{props.step}</span>
            <span className="bs-stepper-label">{props.title}</span>
        </button>
    </div>;
}

class OrgForm extends Component {
    constructor() {
        super();
        this.state = {
            location: { lat: 1.35, lng: 103.8198},
            eventName: '',
            startDate: '',
            endDate: '',
            headCount: 2,
            organiserEmail: '',
            eventCode: '',
            test: {min: 0, max:5}

        };

        this.handleLocationChange= MapData.bind(this);
        this.handleChangeDate = handleChangeDate.bind(this);
        this.decrementPax= decrementPax.bind(this);
        this.incrementPax = incrementPax.bind(this);
        this.onSubmit = onSubmit.bind(this);
        this.handleChange = handleChange.bind(this);
    }

    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
        })
    }



    render() {
        return (
            <Container className=' text-center align-items-center align-content-center'>
                <div id="stepper1" className="bs-stepper  ">
                    <div className="bs-stepper-header">
                        <FormStep title='Event Name' step='1' dataTarget='#test-l-1'/>
                        <FormStep title='Location' step='2' dataTarget='#test-l-2'/>
                        <FormStep title='Date' step='3' dataTarget='#test-l-3'/>
                        <FormStep title='Group Size' step='4' dataTarget='#test-l-4'/>
                        <FormStep title='Email' step='5' dataTarget='#test-l-5'/>
                        <FormStep title='Validate' step='6' dataTarget='#test-l-6'/>
                    </div>
                    <div className="bs-stepper-content">
                        <Form onSubmit={this.onSubmit}>
                            <div id="test-l-1" className="content">
                                <OrgStep1 value={this.state.eventName}
                                          onChange={(e) => this.handleChange(e, 'eventName')}/>
                                {this.state.eventName === '' ?
                                    <h6>An event name is required!</h6>
                                    : <Button className="btn-primary" onClick={() => this.stepper.next()}>Next</Button>}
                            </div>
                            <div id="test-l-2" className="content">
                                <OrgStep2 sendDataToParent={(e) => this.handleLocationChange(e)}/>
                                {!this.state.location.lat ?
                                    <h6>A location is required!</h6> :
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-3" className="content text-center">
                                <OrgStep3
                                    onCallback={(startDate, endDate, label) => this.handleChangeDate(startDate, endDate, label)}/>
                                {this.state.startDate === '' ?
                                    <h6>A date range is required!</h6> :
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}

                            </div>
                            <div id="test-l-4" className="content text-center">
                                <OrgStep4 onClick={() => this.decrementPax(this.state.headCount)}
                                          value={this.state.headCount}
                                          onChange={(e) => this.handleChange(e, 'headCount')}
                                          onClick1={() => this.incrementPax(this.state.headCount)}/>
                                {this.state.headCount === 0 ?
                                    <h6>You need more friends!</h6> :
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-5" className="content text-center">
                                <OrgStep5 onChange={(e) => this.handleChange(e, 'organiserEmail')}/>
                                {(/^[a-zA-Z0-9._]+@[a-zA-Z0-9_]+\.[A-Za-z0-9._]+$/.test(this.state.organiserEmail)) === false ?
                                    <h6>Please check your email!</h6> :
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-6" className="content text-center ">
                                <OrgResult eventName={this.state.eventName} location={this.state.location}
                                           startDate={this.state.startDate} endDate={this.state.endDate}
                                           headCount={this.state.headCount} organiserEmail={this.state.organiserEmail}
                                           eventCode={this.state.eventCode}/>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>

                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        );
    }



}

export default OrgForm;
