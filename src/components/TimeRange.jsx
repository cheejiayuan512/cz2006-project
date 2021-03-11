import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Slider} from "./slider";
import {TimeRangeHelper} from "./TimeRangeHelper";

class TimeRange extends React.Component {
    constructor() {
        super();
        this.state = { show: false }
    }
    _toggle = (bool) => {
        if (this.state.show == false) {
            this.setState({
                show: true
            });
        } else {
            this.setState({
                show: false
            });
        }
    }
    render() {
        return (
            <div>
                <Button className='m-4' type='button' onClick={this._toggle.bind(null, true)}> Show/Hide </Button> // not using
                { this.state.show && (<div> <Slider className='m-4' name={'date' + 'TimingAvailable'} setParentData={this.passFunction  }/> <TimeRangeHelper/> </div>) }
            </div>
        )
    }
}
export { TimeRange};