import {Form} from "react-bootstrap";
import UserPrice from "./UserPrice";
import React from "react";

export function UserStep3(props) {
    return <>
        <Form.Label column='lg' className='font-weight-bold' style={{fontSize: "150%"}}>What
            is your budget?</Form.Label>
        <UserPrice sendDataToParent={props.sendDataToParent}/>
        <Form.Text className="text-muted">Tip: Just get your friends to treat
            you.</Form.Text>
    </>;
}
