import {Form} from "react-bootstrap";
import {Timetable} from "../OrganiserFormComponents/Timetable";
import React from "react";

function UserStep2(props) {
    return <Form.Group>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>When are your preferred
            timings?</Form.Label>
        <div>
            <Timetable onCallback={props.onCallback} startTime='08:00'
                       timeSlots={16} startDate={props.startDate} endDate={props.endDate}/>
        </div>
    </Form.Group>;
}

export {UserStep2}