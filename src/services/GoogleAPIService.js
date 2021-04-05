import {GoogleApiKey, CORSProxy} from "../configurations/secret";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {Component} from "react";
import ErrorImage from '../assets/img.png';
import {Button, Form} from "react-bootstrap";
import React from "react";

import ReactLoading from 'react-loading';
import {
    dateRangeArrayGenerator,
    timeSlotsArrayGenerator,
    timeTableArrayGenerator
} from "../components/OrganiserFormComponents/TimetableHelper";
import {getEventName} from "../controllers/UserFormController";

class RestaurantSlider extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            logged: false,
        };
        this.convertDollar = this.convertDollar.bind(this);

    }

    convertDollar(number){
        if (number<=1){
            return '$';
        } else if (number===2){
            return '$$';
        } else if (number===3){
            return '$$$';
        } else if (number===4){
            return '$$$$';
        } else if (number===5){
            return '$$$$$';
        } else {
            return 'Price not given'
        }
    }

    async componentDidUpdate() {
        if (/\w/.test(this.props.keyWord) && /\w/.test(this.props.radius) && /\w/.test(this.props.lat) && /\w/.test(this.props.long) && !this.state.logged) {
            console.log(this.props.long)
            await fetch(CORSProxy+'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + GoogleApiKey + '&location=' +
                this.props.lat + ',' + this.props.long + '&radius=' + this.props.radius + '&keyword=' + this.props.keyWord)
                .then(res => res.json())
                .then((data) => {
                    console.log('getting restaurants')
                    this.setState({restaurants: data, logged: true});
                })
                .catch(console.log)
        }
    }


    render() {

    if (!this.state.logged ) {
        return <div className='d-flex justify-content-center'><ReactLoading color='#0000FF'/>
        </div>
    }
    const jsonQuery = require('json-query');
    return(<div>
        <div className="container-fluid py-2"><Form>
            <div className="d-flex flex-row flex-nowrap scroll" style={{  overflow:'auto' }}>
            {this.state.restaurants['results'].map((anObjectMapped, index)=>
                <div className='card' style={{minHeight:'300px', minWidth: '300px', width:'300px', marginRight: '5px'}} id={index} key={`${anObjectMapped.name}`}>
                    {console.log(anObjectMapped)}
                    <div className='d-flex align-items-center' style={{height: '160px', overflow : 'hidden' }}>
                        <img className="card-img-top"
                         src={jsonQuery('photos.photo_reference', {data: anObjectMapped}).value ?
                             `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${jsonQuery('photos.photo_reference', {data: anObjectMapped}).value}&key=${GoogleApiKey}`
                             : ErrorImage} alt="Card image cap"  />
                    </div>
                        <h5 className='card-title' style={{fontSize:'1.25vw'}}>{anObjectMapped.name.slice(0,15)}</h5>
                    <p className="card-text"  style={{fontSize:'1vw'}}>{anObjectMapped.user_ratings_total} users gave this place an average rating of {anObjectMapped.rating}!</p>
                    <p style={{fontSize:'1vw'}}>Price level: {this.convertDollar(anObjectMapped.price_level)}</p>
                    <Button  style={{fontSize:'1vw'}}>
                        Send a reservation!
                    </Button>

                </div>)}
            </div></Form>
        </div>
    </div>)}
}
export {RestaurantSlider}
