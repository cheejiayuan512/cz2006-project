import {Form} from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import React from "react";

function OrgStep3(props) {
    return <>
        <Form.Label column='lg' className='font-weight-bold' style={{fontSize: "150%"}}>When is
            the approximate date of the event?</Form.Label>
        <DateRangePicker required onCallback={props.onCallback} format='dd/mm/yyyy'
                         initialSettings={{maxSpan: {"days": 14}}}>
            <input required type="text" className="form-control"/>
        </DateRangePicker>
        <Form.Text className="text-muted">Tip: Don't be a dick.</Form.Text>
    </>;
}

export {OrgStep3}