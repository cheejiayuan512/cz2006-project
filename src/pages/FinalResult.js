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
                console.log(res.data);
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
                console.log(res.data);
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

                console.log("#########",res.data,"##########");
                return (res.data);
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            // this.setState({respondents: result})  // what do we want to save here? confirm current implementation have error if saving the collection directly
        })  // strangely this gives participants not belonging to this group also

        axios.post("http://localhost:9000/getCuisine", {
                eventDetail: this.props.eventCode })
            .then((res) => {
                console.log('Success cuisine');
                console.log(React.Children.toArray(res.data));
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
                console.log('Success cuisine');
                console.log(React.Children.toArray(res.data));
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({latitude: result})
        })

        axios.post("http://localhost:9000/getLongitude", {
            eventDetail: this.props.eventCode })
            .then((res) => {
                console.log('Success cuisine');
                console.log(React.Children.toArray(res.data));
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            }).then(result => {
            console.log(result)
            this.setState({longitude: result})
        })
    }

    render() {
        return (
            <div className={'w-responsive text-center'}>
                <h1>{this.state.respondents}</h1>
                <h2>Everyone has responded to {this.state.eventName}</h2>

                <h2>Event Summary for {this.state.eventName}</h2>
                <h4>{this.state.roomID}</h4>
                <h5> Who responded? {this.state.respondents}</h5>
                <h5>Top Cuisines are {this.state.commonCuisine}</h5>
                <h5>Your common budget range is between {this.state.commonBudget}</h5>
                <h5>Common timeslots include {this.state.commonTiming}</h5>
                <h5>Here is a custom-generated list of restaurants which may interest you!</h5>
                <RestaurantSlider lat={this.state.latitude} long={this.state.longitude} keyWord={this.state.commonCuisine} radius={500}/>
            </div>
        );
    }
}

export default FinalResult;