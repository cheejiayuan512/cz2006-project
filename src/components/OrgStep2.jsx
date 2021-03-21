import React, {useState} from "react";
import MapPicker from 'react-google-map-picker';
import {Button, Form} from "react-bootstrap";
const DefaultLocation = { lat: 1.35, lng: 103.8198};
const DefaultZoom = 11;
const OrgStep2 = ({sendDataToParent}) => {
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation (latitude, longitude){
        sendDataToParent({lat:latitude, lng:longitude});
    }

    function handleChangeZoom (newZoom){
        setZoom(newZoom);
    }

    function handleResetLocation(){
        setDefaultLocation({ ...DefaultLocation});
        setZoom(DefaultZoom);
        sendDataToParent({ lat: 1.35, lng: 103.8198});
    }

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form.Group>
                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>Where is your group going to meet?</Form.Label>
                <Form.Text className="text-muted" style={{fontSize:'100%'}}>
                    Tip: Choose somewhere further away from you so you have an excuse to be late!
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Button variant="secondary" type="button" onClick={handleResetLocation}>Reset Location!</Button>
                <Form.Control required name="latitude" type="hidden" value={[location.lat , location.lng] }  />
                <div className='m-2'> <MapPicker defaultLocation={defaultLocation}
                                 zoom={zoom}
                                 style={{height:'45vh'}}
                                 onChangeLocation={handleChangeLocation}
                                 onChangeZoom={handleChangeZoom}
                    //NEED MONEY ONE DONT PLAY PLAY apiKey='AIzaSyCHxrGY8RvdkGbYv83_OZqEZ7g6YWH2hes'
                                 apiKey='AIzaSyCHxrGY8RvdkGbYv83_OZqEZ7g6YWH2hes'/> </div>
            </Form.Group>
    </div>


    );
};

export default OrgStep2;
