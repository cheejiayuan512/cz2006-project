import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateUserAction } from "./updateAction";
import {Button, Form} from "react-bootstrap";
import {TimeRange} from "./TimeRange";
import {Timetable} from "./Timetable";
// may have to conver to class component to run constructor method to get start and end date from lixians api
const UserStep2 = (props) => {
    const { state, actions } = useStateMachine({ updateUserAction });
    const [players, setPlayers] = useState([]);
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.userDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateUserAction(data);
        console.log(players)
        push("/user/userStep3");
    };
    const handleTimetable = (value) =>{
        setPlayers(value);
        // alert(value);
    };
    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>What is your name?</Form.Label>
                    <div>
                        <Timetable onCallback={handleTimetable} startTime='10:00' timeSlots={5} startDate="03/08/2021" endDate="03/14/2021" />
                        {/*<TimeRange passFunction={setData}/>*/}
                    </div>
                    {/*<Form.Control required name="someName" type="text" placeholder="Select the date and time that you are available!" ref={register()} />*/}
                    {/*<Form.Text className="text-muted">*/}
                    {/*    Tip: You can add two different timeslots per day!*/}
                    {/*</Form.Text>*/}
                </Form.Group>

                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};

export default UserStep2;