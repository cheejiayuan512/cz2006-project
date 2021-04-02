import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import axios from "axios";
import {Timetable} from "../components/OrganiserFormComponents/Timetable";
    import {
        getEventName,
        handleBudgetChange,
    handleChange,
    handleCuisineChange,
    handleTimetable
} from "../controllers/UserFormController";

import {UserStep1} from "../components/UserFormComponents/UserStep1";
import {UserStep2} from "../components/UserFormComponents/UserStep2";
import {UserStep3} from "../components/UserFormComponents/UserStep3";
import {UserStep4} from "../components/UserFormComponents/UserStep4";
import {UserResult} from "../components/UserFormComponents/UserResult";

const FormStep = (props) => {
    return <div className="step" data-target={props.dataTarget}>
        <button className="step-trigger">
            <span className="bs-stepper-circle">{props.step}</span>
            <span className="bs-stepper-label">{props.title}</span>
        </button>
    </div>;
}



class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "roomID": this.props.eventCode,
            "userName": "",
            "userTiming": "",
            "userBudget": [0,4],
            "userCuisine": [],
            "eventName":'test',
            'userCode':'',
            'headCount':'',
            'currentHeadCount':'',
            'startDate':'',
            'endData':'',}
        this.handleTimetable = handleTimetable.bind(this);
        this.handleChange  = handleChange.bind(this);
        this.handleBudgetChange = handleBudgetChange.bind(this);
        this.handleCuisineChange = handleCuisineChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getEventName = getEventName.bind(this);
        this.getEventName().then(result => this.setState({eventName: result}))
        axios.post("http://localhost:9000/getCurrentHeadcount", {eventDetail:this.state.roomID})
            .then((res) => {
                console.log('object' ,res);
                console.log("Getting current headcount...");
                console.log(res.data);
                this.setState({currentHeadCount:res.data})
            })
            .catch((err) => {
                console.log(err);
            })
        axios.post("http://localhost:9000/getMaxHeadcount", {eventDetail:this.state.roomID})
            .then((res) => {
                console.log('object' ,res);
                console.log(res.data);
                this.setState({maxHeadCount:res.data})
            })
            .catch((err) => {
                console.log(err);
            })
        axios.post("http://localhost:9000/getStartDate", {eventDetail:this.state.roomID})
            .then((res) => {
                console.log('object' ,res);
                console.log(res.data);
                this.setState({startDate:res.data})
            })
            .catch((err) => {
                console.log(err);
            })
        axios.post("http://localhost:9000/getEndDate", {eventDetail:this.state.roomID})
            .then((res) => {
                console.log('object' ,res);
                console.log(res.data);
                this.setState({endDate:res.data})
            })
            .catch((err) => {
                console.log(err);
            })

    }
    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
        })

    }

    onSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost:9000/userDetail", { userDetail: {
                    "roomID": this.props.eventCode,
                    "userName": this.state.userName,
                    "userTiming": this.state.userTiming,
                    "userBudget": this.state.userBudget,
                    "userCuisine": this.state.userCuisine,
                    "eventName":this.state.eventName,
                    'userCode':this.state.userCode} })
            .then((res) => {
                console.log(res.data);
                console.log('function called')
                return res.data;

            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({userCode: result})
        });



    }

    render() {

        return (

            <Container className=' justify-content-center text-center align-items-center align-content-center'>
                <Row>
                    <Col><h6>{this.state.currentHeadCount}/{this.state.maxHeadCount} responded to event:{this.state.eventName}!</h6></Col>
                </Row>
                <Row>

                    <Col>
                        <div id="stepper1" className="bs-stepper  ">
                            <div className="bs-stepper-header">
                                <FormStep title='Name' step='1' dataTarget='#test-l-1'/>
                                <FormStep title='Time' step='2' dataTarget='#test-l-2'/>
                                <FormStep title='Budget' step='3' dataTarget='#test-l-3'/>
                                <FormStep title='Cuisines' step='4' dataTarget='#test-l-4'/>
                                <FormStep title='Validate' step='5' dataTarget='#test-l-5'/>
                            </div>
                            <div className="bs-stepper-content">
                                <Form onSubmit={this.onSubmit}>
                                    <div id="test-l-1" className="content">
                                        <UserStep1 value={this.state.userName}
                                                   onChange={(e) => this.handleChange(e, 'userName')}/>
                                        {this.state.userName === '' ? <h6>Your name is required!</h6> :
                                            <Button onClick={() => this.stepper.next()}>Next</Button>}
                                    </div>
                                    <div id="test-l-2" className="content">
                                        <UserStep2 onCallback={this.handleTimetable} startDate={this.state.startDate} endDate={this.state.endDate}/>
                                        {!this.state.userTiming === "" ?
                                            <h6>Pleas indicate your preferred timing!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}
                                    </div>
                                    <div id="test-l-3" className="content text-center">
                                        <UserStep3 sendDataToParent={(data) => this.handleBudgetChange(data)}/>
                                        {!this.state.userBudget === '' ?
                                            <h6>Please indicate your preferred budget!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}

                                    </div>
                                    <div id="test-l-4" className="content text-center">
                                        <UserStep4  sendDataToParent={this.handleCuisineChange}
                                                      />
                                        {this.state.userCuisine === [] ?
                                            <h6>You need to choose at least one cuisine!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}
                                    </div>
                                    <div id="test-l-5" className="content text-center">
                                        <div><UserResult userName={this.state.userName} userTiming={this.state.userTiming}
                                                    userBudget={this.state.userBudget}
                                                    userCuisine={this.state.userCuisine} userMessage={this.state.userCode}/>
                                        <Button onClick={this.onSubmit} className="btn btn-warning">Submit your response!</Button></div>

                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>

                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }





}

export  {UserForm};