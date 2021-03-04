import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import MapPicker from 'react-google-map-picker';
import {Button, Form} from "react-bootstrap";
const DefaultLocation = { lat: 1.35, lng: 103.8198};
const DefaultZoom = 11;
const Step2 = props => {
    const { state, actions } = useStateMachine({updateAction});
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation (latitude, longitude){
        setLocation({lat:latitude, lng:longitude});
    }

    function handleChangeZoom (newZoom){
        setZoom(newZoom);
    }

    function handleResetLocation(){
        setDefaultLocation({ ...DefaultLocation});
        setZoom(DefaultZoom);
    }
    const onSubmit = data => {
        actions.updateAction(data);
        push("/contact/step3");
    };
    return (
        <div className='justify-content-center text-center align-items-center'>
        <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Where is your group going to meet?</Form.Label>
                <Form.Text className="text-muted" style={{fontSize:'100%'}}>
                    Tip: Choose somewhere further away from you so you have an excuse to be late!
                </Form.Text>
            </Form.Group>
            <Form.Group>
                {/*need to add type="button" to prevent html auto thinking its a submit button lmao*/}
                <Button variant="secondary" type="button" onClick={handleResetLocation}>Reset Location!</Button>
                {/*<label>Latitude:</label><input name='latitude' type='text' value={location.lat}  disabled/>*/}
                {/* i hid the input fields cos ugly as hell*/}
                <Form.Control required name="latitude" type="hidden" value={location.lat} ref={register()} />
                <Form.Control required name="longitude" type="hidden" value={location.lng} ref={register()} />
                {/* Disabled <input> elements in a form will not be submitted!*/}
                {/*<label>Longitude:</label><input name='longitude' type='text' value={location.lng}  disabled/>*/}
                {/*<label>Zoom:</label><input type='text' value={zoom} disabled/>*/}
                <div className='m-2'> <MapPicker defaultLocation={defaultLocation}
                                 zoom={zoom}
                                 style={{height:'45vh'}}
                                 onChangeLocation={handleChangeLocation}
                                 onChangeZoom={handleChangeZoom}
                    //NEED MONEY ONE DONT PLAY PLAY apiKey='AIzaSyCHxrGY8RvdkGbYv83_OZqEZ7g6YWH2hes'
                                 apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/> </div>

            </Form.Group>
            <Button variant="secondary m-2" type="button" as={Link} to='/contact' >Back!</Button>
            <Button variant="primary" type="submit">Next!</Button>
        </Form>
    </div>


    );
};

export default Step2;
