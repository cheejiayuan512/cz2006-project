import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Link} from "react-router-dom";
const Result = props => {
    const { state } = useStateMachine({updateAction});

    return (
        <div className="container text-center">
            <h2>Result</h2>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <div>
            <p>Thank you for registering, your event has been created. You may proceed with joining the event!</p>
                <Link exact to="/stuff">
                    <button type="button" className="btn btn-primary btn-lg m-3">Join Event</button>
                </Link>
            </div>
        </div>
    );
};

export default Result;
