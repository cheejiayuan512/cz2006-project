import {GoogleApiKey, CORSProxy} from "../secret";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {Component} from "react";
import ErrorImage from '../assets/img.png';
import {Button, Form} from "react-bootstrap";

import ReactLoading from 'react-loading';


class RestaurantSlider extends Component  {
    state = {
        restaurants: []
    };
    componentDidMount() {
        fetch(CORSProxy +'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+ GoogleApiKey + '&location='+this.props.locationdetails.lat+','+this.props.locationdetails.long+'&radius='+this.props.locationdetails.radius+'&keyword=food')
            .then(res => res.json())
            .then((data) => {
                this.setState({ restaurants: data });
                console.log(this.state.restaurants);
            })
            .catch(console.log)


    }

    render() {

    if (!this.state.restaurants['results'] ) {
        return <div className='d-flex justify-content-center'><ReactLoading color='#0000FF'/></div>
    }
    const jsonQuery = require('json-query');
    console.log(jsonQuery('results.photos.photo_reference', {data: this.state.restaurants}));
    return(<div>
        <h1>message: {this.props.locationdetails.text}</h1>
        <h1>lat: {this.props.locationdetails.lat}</h1>
        <h1>long: {this.props.locationdetails.long}</h1>
        <h1>radius: {this.props.locationdetails.radius}</h1>
        <div className="container-fluid py-2" style={{overflowX:'auto'}}>
            <div className="d-flex flex-row flex-nowrap">
            {this.state.restaurants['results'].map((anObjectMapped, index)=>
                <div className='card' style={{minHeight:'300px', minWidth: '300px', width:'300px', marginRight: '5px'}} id={index} key={`${anObjectMapped.name}`}>
                    <div className='d-flex align-items-center' style={{height: '160px', overflow : 'hidden' }}>
                        <img className="card-img-top"
                         src={jsonQuery('photos.photo_reference', {data: anObjectMapped}).value ?
                             `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${jsonQuery('photos.photo_reference', {data: anObjectMapped}).value}&key=${GoogleApiKey}`
                             : ErrorImage} alt="Card image cap"  />
                    </div>
                        <h5 className='card-title'>{anObjectMapped.name}</h5>
                    <p className="card-text">{anObjectMapped.user_ratings_total} users gave this place an average rating of {anObjectMapped.rating}!</p>
                    <Form.Check
                        type="switch"
                        label="I would like to eat here!"
                        id={anObjectMapped.name.replace(/\./g, '').replace(/ /g,"_")}
                        name={anObjectMapped.name.replace(/\./g, '').replace(/ /g,"-")} ref={this.props.locationdetails.register}
                    />


                </div>)}
            </div>
        </div>
    </div>)}
}
export {RestaurantSlider}
