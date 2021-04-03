import {GoogleApiKey, CORSProxy} from "../configurations/secret";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {Component} from "react";
import ErrorImage from '../assets/img.png';
import {Button, Form} from "react-bootstrap";

import ReactLoading from 'react-loading';

class RestaurantSlider extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []

        };


    }

    componentDidMount() {
        fetch(CORSProxy +'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+ GoogleApiKey + '&location='+this.props.lat+','+this.props.long+'&radius='+this.props.radius+'&keyword='+this.props.keyWord)
            .then(res => res.json())
            .then((data) => {
                this.setState({ restaurants: data });
            })
            .catch(console.log)


    }

    render() {

    if (!this.state.restaurants['results'] ) {
        return <div className='d-flex justify-content-center'><ReactLoading color='#0000FF'/></div>
    }
    const jsonQuery = require('json-query');
    return(<div >
        <h5>message: {this.props.text}, lat: {this.props.lat}, long: {this.props.long}, radius: {this.props.radius}, keyword: {this.props.keyWord}</h5>
        <div className="container-fluid py-2"  ><Form>
            <div className="d-flex flex-row flex-nowrap scroll" style={{  overflow:'auto' }}>
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
                        name={anObjectMapped.name.replace(/\./g, '').replace(/ /g,"-")}
                        onChange={this.props.onChange}
                    />


                </div>)}
            </div></Form>
        </div>
    </div>)}
}
export {RestaurantSlider}
