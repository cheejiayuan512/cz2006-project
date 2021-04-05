import React, {Component} from 'react';
import {getEventName} from "../controllers/UserFormController";
import {RestaurantSlider} from "../services/GoogleAPIService";
import axios from "axios";

class FinalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "roomID": this.props.eventCode,
            "userName": "",
            "commonTiming": "",
            "commonBudget": [0,0],
            "commonCuisine": [],
            "eventName": 'test',
            'userCode': '',
            'headCount': '',
            'respondents': [],
            'latitude': "",
            'longitude': ""}
        this.getEventName = getEventName.bind(this);
        this.getEventName().then(result => this.setState({eventName: result}))
        console.log(this.state.roomID)

        axios.post("http://localhost:9000/getCommonSlot", {
                eventDetail: this.props.eventCode} )
            .then((res) => {
                console.log('Success common slot');
                return res.data;
            })
            .catch((err) => {
                console.log('Failure common slot')
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({commonTiming: result})
        })

        axios.post("http://localhost:9000/getBudget", {
                eventDetail: this.props.eventCode} )
            .then((res) => {
                console.log('Success budget');
                return res.data;
            })
            .catch((err) => {
                console.log('Failure budget')
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({commonBudget: result})
        })

        axios.post("http://localhost:9000/getAllParticipants", {
                    eventDetail: this.props.eventCode} )
            .then((res) => {
                console.log(this.props.eventCode)
                console.log('Success getAllParticipants');
                console.log(res.data)
                var participants=[]
                for (var i =0; i<res.data.length; i++){
                    participants.push(res.data[i].userName)
                }
                return ([participants.join(', ')]);
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({respondents: result})
        })

        axios.post("http://localhost:9000/getCuisine", {
                eventDetail: this.props.eventCode })
            .then((res) => {
                console.log('Success cuisine');
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({commonCuisine: result})
        })

        axios.post("http://localhost:9000/getLatitude", {
            eventDetail: this.props.eventCode })
            .then((res) => {
                console.log('Success latitude');
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({latitude: result[0]})
        })

        axios.post("http://localhost:9000/getLongitude", {
            eventDetail: this.props.eventCode })
            .then((res) => {
                console.log('Success longitude');
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({longitude: result[0]})
            console.log(' ')
        })
    }

    render() {
        return (
            <div className={'w-responsive text-center'}>
                <h1 style={{display:"inline"}}>Event Summary for </h1>
                <h1 style={{fontWeight:800, display:"inline"}}> {this.state.eventName}</h1>
                <h5>Who responded?</h5>
                <h5 className='mb-4'>{this.state.respondents}</h5>
                <h5 className='mb-4'>Top Cuisine(s) are: {String(this.state.commonCuisine).split(' OR ').join(', ')}</h5>
                <h5 className='mb-4'>Your common budget range is between {this.state.commonBudget.join(' to ')}</h5>
                <h5 className='mb-4'>Common timeslots include {[this.state.commonTiming].join(', ')}</h5>
                <h5 className='mb-4'>Here is a custom-generated list of restaurants which may interest you!</h5>
                <RestaurantSlider lat={this.state.latitude} long={this.state.longitude} keyWord={this.state.commonCuisine} radius={2000}/>
            </div>
        );
    }
}

export default FinalResult;