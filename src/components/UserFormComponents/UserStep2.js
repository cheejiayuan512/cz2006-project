import {Form} from "react-bootstrap";
import {Timetable} from "../OrganiserFormComponents/Timetable";
import React from "react";

function UserStep2(props) {
    return <Form.Group>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>When are your preferred
            timings?</Form.Label>
        <div>
            <Timetable onCallback={props.onCallback} startTime='10:00'
                       timeSlots={5} startDate="03/08/2021" endDate="03/14/2021"/>
            {/*<TimeRange passFunction={setData}/>*/}
        </div>
    </Form.Group>;
}

export {UserStep2}