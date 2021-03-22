import React, {Component} from 'react';
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import {dateRangeArrayGenerator, timeSlotsArrayGenerator, timeTableArrayGenerator} from './TimetableHelper';
import {Button} from "react-bootstrap";
class Timetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cells: timeTableArrayGenerator(this.props.startDate, this.props.endDate, this.props.timeSlots),
                    dateArray : dateRangeArrayGenerator(this.props.startDate, this.props.endDate) ,
                    timeSlotsArray : timeSlotsArrayGenerator(this.props.startTime, this.props.timeSlots)};
            };
    // across = number of days + 1, down = number of timeslots + 1
    render = () =>
        <div>
            <TableDragSelect value={this.state.cells} onChange={this.handleChange}>

                <tr>
                    <td disabled/>
                    {this.state.dateArray.map((anObjectMapped)=> <td id={anObjectMapped} disabled>{anObjectMapped}</td>)}
                </tr>
                {this.state.cells.slice(1).map((anObjectMapped, index)=> <tr><td disabled>{this.state.timeSlotsArray[index]}</td>{anObjectMapped.slice(1).map((anotherObjectMapped)=> <td/>)}</tr>)}

            </TableDragSelect>
            <Button type={"button"} variant="warning" onClick={this.handleClick}>Reset Available Timings</Button>
        </div>;

    handleChange = cells => {
        this.setState({ cells },this.props.onCallback(cells));
        console.log(cells);

    };

    handleClick = () => {
        const cells = timeTableArrayGenerator(this.props.startDate, this.props.endDate, this.props.timeSlots);
        this.setState({ cells });
    };
}
export {Timetable}