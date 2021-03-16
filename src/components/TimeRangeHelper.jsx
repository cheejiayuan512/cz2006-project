import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Slider} from "./slider";

class TimeRangeHelper extends React.Component {
    constructor() {
        super();
        this.state = { show: false };
    }
    _toggle = (bool) => {
        if (this.state.show === false) {
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
                <br/>
                <Button className='m-4' type='button' onClick={this._toggle.bind(null, true)}> Add another </Button>
                { this.state.show && (<div><Slider name={'date' + 'TimingAvailable'}   /></div>) }
            </div>
        )
    }
}

export {
    TimeRangeHelper
};