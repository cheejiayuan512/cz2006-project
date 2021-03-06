import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateOrganiserAction } from "./updateAction";
import {Button, Form, Col} from "react-bootstrap";
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
const DateRange = {startDate: '01/01/2020', endDate: '01/12/2020'};
export default () => {
    const { state, actions } = useStateMachine({ updateOrganiserAction });
    const { handleSubmit, errors, register, control } = useForm({
        defaultValues: state.eventDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateOrganiserAction(data);
        push("/organiser/organiserStep4");
    };
    const [dateRange, setDateRange] = useState(DateRange);
    const [userDateRange, setUserDateRange] = useState(dateRange);
    function handleChangeDate (startDate, endDate, label){
        console.log(startDate, endDate, label);
        setUserDateRange({startDate:startDate.format("DD/MM/YYYY"), endDate:endDate.format("DD/MM/YYYY")});
        setDateRange({startDate:startDate.format("DD/MM/YYYY"), endDate:endDate.format("DD/MM/YYYY")});
        console.log(dateRange);
    }
    function handleEvent(event, picker) {
        console.log(picker.startDate);
    }

    return (
        <div className='justify-content-center text-center align-items-center'>
            <Form className='d-inline-block flex-column p-2 ' onSubmit={handleSubmit(onSubmit)}>
                <Form.Label column='lg' className='font-weight-bold' style={{fontSize:'150%'}}>When is the approximate date of the event?</Form.Label>
                <Form.Control required name="eventStartDate" type="hidden" value={userDateRange.startDate !== undefined ? userDateRange.startDate : DateRange.startDate} ref={register()} />
                <Form.Control required name="eventEndDate" type="hidden" value={userDateRange.endDate !== undefined ? userDateRange.endDate : DateRange.endDate} ref={register()} />
                <DateRangePicker required onEvent={handleEvent} onCallback={handleChangeDate}  initialSettings={dateRange}>
                    <input required type="text" className="form-control"/>
                </DateRangePicker>


                <Form.Text className="text-muted">Tip: Don't be a dick.</Form.Text>

                {/*if we wanna be zai make onclick so can hide the url hehehe*/}
                <Button variant="secondary m-2" type="button" as={Link} to='/organiser/organiserStep2' >Back!</Button>
                <Button variant="primary" type="submit">Next!</Button>
            </Form>
        </div>
    );
};
