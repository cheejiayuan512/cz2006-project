import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Form} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import OrgStep2 from "./OrgStep2";
import axios from "axios";

class TestingForm extends Component {
    constructor() {
        super();
        this.state = {
            location: { lat: 1.35, lng: 103.8198},
            eventName: '',
            startDate: '',
            endDate: '',
            headCount: 1,
            organiserEmail: '',

        };

        this.MapData= this.MapData.bind(this);
        this.handleEventNameChange = this.handleEventNameChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeHeadCount = this.handleChangeHeadCount.bind(this);
        this.decrementPax= this.decrementPax.bind(this);
        this.incrementPax = this.incrementPax.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
;    }

    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
        })
    }

    onSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost:9000/eventCreation", { eventDetail: this.state })
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
            <div className='d-flex justify-content-center text-center align-items-center align-content-center'>
                <div id="stepper1" className="bs-stepper  ">
                    <div className="bs-stepper-header">
                        <div className="step" data-target="#test-l-1">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">1</span>
                                <span className="bs-stepper-label">Event Name</span>
                            </button>
                        </div>
                        <div className="step" data-target="#test-l-2">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">2</span>
                                <span className="bs-stepper-label">Location</span>
                            </button>
                        </div>
                        <div className="step" data-target="#test-l-3">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">3</span>
                                <span className="bs-stepper-label">Date</span>
                            </button>
                        </div>
                        <div className="step" data-target="#test-l-4">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">4</span>
                                <span className="bs-stepper-label">Group Size</span>
                            </button>
                        </div>

                        <div className="step" data-target="#test-l-5">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">5</span>
                                <span className="bs-stepper-label">Email</span>
                            </button>
                        </div>
                        <div className="step" data-target="#test-l-6">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">6</span>
                                    <span className="bs-stepper-label">Validate Details</span>
                            </button>
                        </div>
                    </div>
                    <div className="bs-stepper-content">
                        <Form onSubmit={this.onSubmit}>
                            <div id="test-l-1" className="content">
                                <Form.Group>
                                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Let's get started! What is your event name?</Form.Label>
                                    <Form.Control required name="eventName" type="text" placeholder="Finals Bojio??!"  value={this.state.eventName} onChange={this.handleEventNameChange} />
                                    <Form.Text className="text-muted">
                                        Choose something fun!
                                    </Form.Text>
                                </Form.Group>
                                {this.state.eventName===''?
                                    <h6>An event name is required!</h6>
                                    :<Button className="btn-primary" onClick={() => this.stepper.next()}>Next</Button>}
                            </div>
                            <div id="test-l-2" className="content">
                                <OrgStep2 sendDataToParent={this.MapData} />
                                {!this.state.location.lat?
                                    <h6>A location is required!</h6>:
                                    <div>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-3" className="content text-center">
                                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>When is the approximate date of the event?</Form.Label>
                                <DateRangePicker required onCallback={this.handleChangeDate}  format='dd/mm/yyyy'>
                                    <input required type="text" className="form-control"/>
                                </DateRangePicker>
                                <Form.Text className="text-muted">Tip: Don't be a dick.</Form.Text>
                                {this.state.startDate===''?
                                    <h6>A date range is required!</h6>:
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}

                            </div>
                            <div id="test-l-4" className="content text-center">
                                <Form.Group>
                                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>How many pax will be attending?</Form.Label>
                                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#D33434',borderColor:'#d33434'}} onClick={this.decrementPax}>-</Button>
                                    <Form.Control required name="headCount" value={this.state.headCount} placeholder='1'
                                                  style={{margin:'20px', width: '160px',height: '160px',display: 'inline-block', fontSize:100,textAlign:'center'}} onChange={this.handleChangeHeadCount} readOnly />
                                    <Button type='button' style={{width: '50px',height: '50px',textAlign:'center', fontSize:'x-large',backgroundColor:'#d33434',borderColor:'#d33434'}} onClick={this.incrementPax}>+</Button>
                                    <Form.Text className="text-muted">
                                        Your number of friends don't define you... or not?
                                    </Form.Text>
                                </Form.Group>
                                {this.state.headCount === 0 ?
                                    <h6>You need more friends!</h6>:
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-5" className="content text-center">
                                <Form.Group>
                                    <Form.Label
                                        column="lg"
                                        className="font-weight-bold"
                                        style={{ fontSize: "150%" }}
                                    >
                                        Enter your email address to be notified!
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        name="organiserEmail"
                                        type="email"
                                        placeholder="Enter an email here!"
                                        onChange={this.handleEmailChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Please use a real email to prove that you are a real person with
                                        real friends!
                                    </Form.Text>
                                </Form.Group>
                                { (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.organiserEmail)) === false?
                                    <h6>Please check your email!</h6>:
                                    <div>
                                        <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                        <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button></div>}
                            </div>
                            <div id="test-l-6" className="content text-center ">
                                <Form.Group>
                                    <Form.Label column="lg" className="font-weight-bold" style={{ fontSize: "150%" }}>Check Your Event Details!</Form.Label>
                                    <h4>Event Name: {this.state.eventName}</h4>
                                    <h4>Event Location: {this.state.location.lat}, {this.state.location.lng}</h4>
                                    <h4>Event Date Range: {this.state.startDate} to {this.state.endDate} </h4>
                                    <h4>Number of People: {this.state.headCount}</h4>
                                    <h4>Organiser's Email: {this.state.organiserEmail}</h4>
                                    {this.state.eventCode ?<h2>Event Code: {this.state.eventCode}</h2>: <div/>}
                                    <Button type="submit" className="btn btn-primary mt-5">Validate</Button>
                                </Form.Group>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    MapData(data){
        console.log(data);
        this.setState({location:data}, console.log(this.state))
    }


    handleEventNameChange(event) {
        this.setState({eventName: event.target.value});
        console.log(event.target.value);
    }
    validateEmail(email)
    {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    handleChangeDate(startDate, endDate, label) {
        console.log(startDate, endDate, label)
        this.setState({startDate:startDate.format("MM/DD/YYYY"), endDate:endDate.format("MM/DD/YYYY")});
        console.log(this.state);
    }
    incrementPax(){
        if (this.state.headCount<25) {
            this.setState((prevState) => ({ headCount: prevState.headCount + 1 }))
        }
    }
    decrementPax(){
        if (this.state.headCount>=2) {
            this.setState((prevState) => ({ headCount: prevState.headCount - 1 }))
        }
    }

    handleChangeHeadCount(event) {
        this.setState({headCount: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({organiserEmail: event.target.value});
    }
}

export default TestingForm;
