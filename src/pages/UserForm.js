import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import axios from "axios";
import {Timetable} from "../components/OrganiserFormComponents/Timetable";
    import {handleChange} from "../controllers/UserFormController";

import UserPrice from "../components/UserFormComponents/UserPrice";
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
            "roomID": "",
            "userName": "",
            "userTiming": "",
            "userBudget": [0,4],
            "userCuisine": "",
        "eventName":'test'}
        this.handleTimetable = this.handleTimetable.bind(this);
        this.handleChange  = handleChange.bind(this);
        this.handleBudgetChange = this.handleBudgetChange.bind(this);
        this.handleCuisineChange = this.handleCuisineChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getEventName().then(result => this.setState({eventName: result}))

    }
    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
        })

    }
    getEventName() {
        // replace with whatever your api controllers is.
        return axios
            .post("http://localhost:9000/getEventName", { eventDetail: this.props.eventCode })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost:9000/userDetail", { eventDetail: this.state })
            .then((res) => {
                console.log(res.data);
                console.log('function called')
                return res.data;

            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({eventCode:result})
        });


    }

    render() {

        return (

            <Container className=' justify-content-center text-center align-items-center align-content-center'>
                <Row>
                    <Col><h6 className={'text-center'}>You are responding to {this.state.eventName} with event
                        code: {this.props.eventCode}</h6></Col>
                    <Col><h6>Number of respondents: currentHeadCount/maxHeadCount</h6></Col>
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
                                        <UserStep2 onCallback={this.handleTimetable}/>
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
                                        <UserStep4 onClick={this.decrementPax} value={this.state.headCount}
                                                      onChange={this.handleChangeHeadCount}
                                                      onClick1={this.incrementPax}/>
                                        {this.state.userCuisine === '' ?
                                            <h6>You need to choose at least one cuisine!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}
                                    </div>
                                    <div id="test-l-5" className="content text-center">
                                        <UserResult userName={this.state.userName} userTiming={this.state.userTiming}
                                                    userBudget={this.state.userBudget}
                                                    userCuisine={this.state.userCuisine}/>
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
    handleTimetable(value){
        this.setState({userTiming: value})
    }
    handleNameChange(event){
        this.setState({userName: event.target.value })
    }
    handleBudgetChange(event){
        this.setState({userBudget: event })
    }
    handleCuisineChange(event){
        this.setState({userCuisine: event.target.value })
    }


}

export  {UserForm};