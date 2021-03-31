import React, {Component} from 'react';
import {getEventName} from "../controllers/UserFormController";
import {RestaurantSlider} from "../services/GoogleAPIService";

class FinalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "roomID": this.props.eventCode,
            "userName": "",
            "commonTiming": "",
            "commonBudget": [0,4],
            "commonCuisine": [],
            "eventName":'test',
            'userCode':'',
            'headCount':'',
            'respondents':''}
        this.getEventName = getEventName.bind(this);
        this.getEventName().then(result => this.setState({eventName: result}))
    }

        render() {
        return (
            <div className={'w-responsive text-center'}>
                <h2>Everyone has responded to {this.state.eventName}</h2>

                <h2>Event Summary for {this.state.eventName}</h2>
                <h4>{this.state.roomID}</h4>
                <h5> Who responded? {this.state.respondents}</h5>
                <h5>Top Cuisines are {this.state.commonCuisine}</h5>
                <h5>Your common budget range is between {this.state.commonBudget}</h5>
                <h5>Common timeslots include {this.state.commonTiming}</h5>
                <h5>Here is a custom-generated list of restaurants which may interest you!</h5>
                <RestaurantSlider/>
            </div>
        );
    }
}

export default FinalResult;