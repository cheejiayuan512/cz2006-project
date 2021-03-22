import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import OrgStep2 from "../components/OrganiserFormComponents/OrgStep2";
import axios from "axios";
import {Timetable} from "../components/OrganiserFormComponents/Timetable";
import UserPrice from "../components/UserFormComponents/UserPrice";


class ResponseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "roomID": "",
            "userName": "",
            "userTiming": "",
            "userBudget": "",
            "userCuisine": "",
        "eventName":'test'}
        this.handleTimetable = this.handleTimetable.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBudgetChange = UserPrice.bind(this);
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
                                <div className="step" data-target="#test-l-1">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">1</span>
                                        <span className="bs-stepper-label">Name</span>
                                    </button>
                                </div>
                                <div className="step" data-target="#test-l-2">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">2</span>
                                        <span className="bs-stepper-label">Time</span>
                                    </button>
                                </div>
                                <div className="step" data-target="#test-l-3">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">3</span>
                                        <span className="bs-stepper-label">Budget</span>
                                    </button>
                                </div>
                                <div className="step" data-target="#test-l-4">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">4</span>
                                        <span className="bs-stepper-label">Cuisines</span>
                                    </button>
                                </div>

                                <div className="step" data-target="#test-l-5">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">5</span>
                                        <span className="bs-stepper-label">Validate Details</span>
                                    </button>
                                </div>
                            </div>
                            <div className="bs-stepper-content">
                                <Form onSubmit={this.onSubmit}>
                                    <div id="test-l-1" className="content">
                                        <Form.Group>
                                            <Form.Label column='lg' className='font-weight-bold'
                                                        style={{fontSize: '150%'}}>Let's get started! What is your
                                                name?</Form.Label>
                                            <Form.Control required name="userName" type="text" placeholder="Bob Bob??!"
                                                          value={this.state.userName} onChange={this.handleNameChange}/>
                                            <Form.Text className="text-muted">
                                                Do your
                                            </Form.Text>
                                        </Form.Group>
                                        {this.state.userName === '' ?
                                            <h6>Your name is required!</h6>
                                            : <Button className="btn-primary"
                                                      onClick={() => this.stepper.next()}>Next</Button>}
                                    </div>
                                    <div id="test-l-2" className="content">
                                        <Form.Group>
                                            <Form.Label column='lg' className='font-weight-bold'
                                                        style={{fontSize: '150%'}}>When are your preferred
                                                timings?</Form.Label>
                                            <div>
                                                <Timetable onCallback={this.handleTimetable} startTime='10:00'
                                                           timeSlots={5} startDate="03/08/2021" endDate="03/14/2021"/>
                                                {/*<TimeRange passFunction={setData}/>*/}
                                            </div>
                                        </Form.Group>
                                        {!this.state.userTiming === "" ?
                                            <h6>Pleas indicate your preferred timing!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}
                                    </div>
                                    <div id="test-l-3" className="content text-center">
                                        <Form.Label column='lg' className='font-weight-bold' style={{fontSize: '150%'}}>What
                                            is your budget?</Form.Label>
                                        <UserPrice sendDataToParent={this.handleBudgetChange}/>
                                        <Form.Text className="text-muted">Tip: Just get your friends to treat
                                            you.</Form.Text>
                                        {!this.state.userBudget === '' ?
                                            <h6>Please indicate your preferred budget!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}

                                    </div>
                                    <div id="test-l-4" className="content text-center">
                                        <Form.Group>
                                            <Form.Label column='lg' className='font-weight-bold'
                                                        style={{fontSize: '150%'}}>What is your preferred
                                                cuisine?</Form.Label>
                                            <Button type='button' style={{
                                                width: '50px',
                                                height: '50px',
                                                textAlign: 'center',
                                                fontSize: 'x-large',
                                                backgroundColor: '#D33434',
                                                borderColor: '#d33434'
                                            }} onClick={this.decrementPax}>-</Button>
                                            <Form.Control required name="headCount" value={this.state.headCount}
                                                          placeholder='1'
                                                          style={{
                                                              margin: '20px',
                                                              width: '160px',
                                                              height: '160px',
                                                              display: 'inline-block',
                                                              fontSize: 100,
                                                              textAlign: 'center'
                                                          }} onChange={this.handleChangeHeadCount} readOnly/>
                                            <Button type='button' style={{
                                                width: '50px',
                                                height: '50px',
                                                textAlign: 'center',
                                                fontSize: 'x-large',
                                                backgroundColor: '#d33434',
                                                borderColor: '#d33434'
                                            }} onClick={this.incrementPax}>+</Button>
                                            <Form.Text className="text-muted">
                                                I like KBBQ.
                                            </Form.Text>
                                        </Form.Group>
                                        {this.state.userCuisine === '' ?
                                            <h6>You need to choose at least one cuisine!</h6> :
                                            <div>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.previous()}>Back</Button>
                                                <Button className='m-2'
                                                        onClick={() => this.stepper.next()}>Next</Button></div>}
                                    </div>
                                    <div id="test-l-5" className="content text-center">
                                        <Form.Group>
                                            <Form.Label column="lg" className="font-weight-bold"
                                                        style={{fontSize: "150%"}}>Check Your Event
                                                Details!</Form.Label>
                                            <h4>Preferred Name: {this.state.userName}</h4>
                                            <h4>Preferred Timings: {this.state.userTiming}</h4>
                                            <h4>Preferred Budget: {this.state.userBudget} </h4>
                                            <h4>Preferred Cuisine(s): {this.state.userCuisine}</h4>
                                            <Button type="submit" className="btn btn-primary mt-5">Submit</Button>
                                        </Form.Group>
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
        this.setState({userBudget: event.target.value })
    }
    handleCuisineChange(event){
        this.setState({userCuisine: event.target.value })
    }


}

export  {ResponseForm};