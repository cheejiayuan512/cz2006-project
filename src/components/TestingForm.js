import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import {Button, Form} from "react-bootstrap";
import MapPicker from "react-google-map-picker";
import DateRangePicker from "react-bootstrap-daterangepicker";

class TestingForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            defaultLocation: { lat: 1.35, lng: 103.8198},
            defaultZoom: 11,
            location: { lat: 1.35, lng: 103.8198},
            zoom : 11,
            eventName: '',
            startDate: '',
            endDate: '',
            headCount: 1,
            organiserEmail: ''

        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEventNameChange = this.handleEventNameChange.bind(this)
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeZoom = this.handleChangeZoom.bind(this);
        this.handleResetLocation = this.handleResetLocation.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeHeadCount = this.handleChangeHeadCount.bind(this);
        this.decrementPax= this.decrementPax.bind(this);
        this.incrementPax = this.incrementPax.bind(this);
    }

    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
        })
    }


    onSubmit(e) {
        e.preventDefault()
    }

    render() {

        return (
            <div>
                <div id="stepper1" className="bs-stepper">
                    <div className="bs-stepper-header">
                        <div className="step" data-target="#test-l-1">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">1</span>
                                <span className="bs-stepper-label">Event Name</span>
                            </button>
                        </div>
                        <div className="bs-stepper-line"/>
                        <div className="step" data-target="#test-l-2">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">2</span>
                                <span className="bs-stepper-label">Location</span>
                            </button>
                        </div>
                        <div className="bs-stepper-line"/>
                        <div className="step" data-target="#test-l-3">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">3</span>
                                <span className="bs-stepper-label">Date</span>
                            </button>
                        </div>
                        <div className="bs-stepper-line"/>
                        <div className="step" data-target="#test-l-4">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">4</span>
                                <span className="bs-stepper-label">Group Size</span>
                            </button>
                        </div>
                        <div className="bs-stepper-line"/>

                        <div className="step" data-target="#test-l-5">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">5</span>
                                <span className="bs-stepper-label">Email</span>
                            </button>
                        </div>
                        <div className="bs-stepper-line"/>
                        <div className="step" data-target="#test-l-6">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">6</span>
                                    <span className="bs-stepper-label">Validate Details</span>
                            </button>
                        </div>
                    </div>
                    <div className="bs-stepper-content">
                        <form onSubmit={this.onSubmit}>
                            <div id="test-l-1" className="content">
                                <Form.Group>
                                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Let's get started! What is your event name?</Form.Label>
                                    <Form.Control required name="eventName" type="text" placeholder="Finals Bojio??!"   onChange={this.handleEventNameChange} />
                                    <Form.Text className="text-muted">
                                        Choose something fun!
                                    </Form.Text>
                                </Form.Group>
                                {(this.state.eventName!='')?<button type='submit' className="btn btn-primary" onClick={() => this.stepper.next()}>Next</button>:<div/>}

                            </div>
                            <div id="test-l-2" className="content">
                                <Form.Group>
                                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Where is your group going to meet?</Form.Label>
                                    <Form.Text className="text-muted" style={{fontSize:'100%'}}>
                                        Tip: Choose somewhere further away from you so you have an excuse to be late!
                                    </Form.Text>

                                </Form.Group>
                                <Form.Group>
                                    {/*need to add type="button" to prevent html auto thinking its a submit button lmao*/}
                                    <Button variant="secondary" type="button" onClick={this.handleResetLocation}>Reset Location!</Button>
                                    <div className='m-2'> <MapPicker defaultLocation={this.state.defaultLocation}
                                                                     zoom={this.state.defaultZoom}
                                                                     style={{height:'45vh'}}
                                                                     onChangeLocation={this.handleChangeLocation}
                                                                     onChangeZoom={this.handleChangeZoom}
                                        //NEED MONEY ONE DONT PLAY PLAY apiKey='AIzaSyCHxrGY8RvdkGbYv83_OZqEZ7g6YWH2hes'
                                                                     apiKey='AIzaSyCHxrGY8RvdkGbYv83_OZqEZ7g6YWH2hes'/> </div>

                                </Form.Group>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button>
                            </div>
                            <div id="test-l-3" className="content text-center">
                                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>When is the approximate date of the event?</Form.Label>
                                <DateRangePicker required onCallback={this.handleChangeDate}  format='dd/mm/yyyy'>
                                    <input required type="text" className="form-control"/>
                                </DateRangePicker>
                                <Form.Text className="text-muted">Tip: Don't be a dick.</Form.Text>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button>

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
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button>
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

                                    />
                                    <Form.Text className="text-muted">
                                        Please use a real email to prove that you are a real person with
                                        real friends!
                                    </Form.Text>
                                </Form.Group>
                                <button type="submit" className="btn btn-primary mt-5">Submitag22ain</button>
                                <Button className='m-2' onClick={() => this.stepper.previous()}>Back</Button>
                                <Button className='m-2' onClick={() => this.stepper.next()}>Next</Button>
                            </div>
                            <div id="test-l-6" className="content text-center">
                                <button type="submit" className="btn btn-primary mt-5">Validate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeZoom(zoom) {
        this.setState({zoom: zoom });
        console.log(this.state.zoom)
    }

    handleResetLocation() {
        this.setState({location : this.state.defaultLocation , zoom : this.state.defaultZoom});
        console.log(this.state)
    }

    handleChangeLocation (latitude, longitude){
        this.setState({location: {lat: latitude, lng: longitude}});
    }

    handleEmailChange(event) {
        this.setState({organiserEmail: event.target.value}, ()=>
            console.log(event.target.value));
    }

    handleEventNameChange(event) {
        this.setState({eventName:event.target.value})
        console.log(this.state.eventName);
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

}

export default TestingForm;
