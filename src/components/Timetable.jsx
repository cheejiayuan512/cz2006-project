import React, {Component} from 'react';
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import {dateRangeArrayGenerator, timeSlotsArrayGenerator, timeTableArrayGenerator} from './TimetableHelper';
class Timetable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cells: timeTableArrayGenerator(this.props.startDate, this.props.endDate, this.props.timeSlots),
                    dateArray : dateRangeArrayGenerator(this.props.startDate, this.props.endDate) ,
                    timeSlotsArray : timeSlotsArrayGenerator(this.props.startTime, this.props.timeSlots)};
        // console.log(this.state.dateArray);
        // console.log(this.state.cells)
        // console.log(this.state.timeSlotsArray)
        // this.props.startDate
        // this.props.endDate
        // this.props.timeSlots
        // this.props.startTime






    };
    // across = number of days + 1, down = number of timeslots + 1
    render = () =>
        <div>
            <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
                {/*<tr>*/}
                {/*    <td disabled />*/}
                {/*    <td disabled>Monday</td>*/}
                {/*    <td disabled>Tuesday</td>*/}
                {/*    <td disabled>Wednesday</td>*/}
                {/*    <td disabled>Thursday</td>*/}
                {/*    <td disabled>Friday</td>*/}
                {/*    <td disabled>Saturday</td>*/}
                {/*    <td disabled>Sunday</td>*/}
                {/*</tr>*/}
                <tr>
                    <td disabled/>
                    {this.state.dateArray.map((anObjectMapped)=> <td id={anObjectMapped} disabled>{anObjectMapped}</td>)}
                </tr>
                {this.state.cells.slice(1).map((anObjectMapped, index)=> <tr><td disabled>{this.state.timeSlotsArray[index]}</td>{anObjectMapped.slice(1).map((anotherObjectMapped)=> <td/>)}</tr>)}

            </TableDragSelect>
            <button type={"button"} onClick={this.handleClick}>Reset</button>
        </div>;

    handleChange = cells => {
        this.setState({ cells });
        console.log(cells);
        this.props.onCallback(cells);
    };

    handleClick = () => {
        const cells = timeTableArrayGenerator();
        this.setState({ cells });
    };
}
export {Timetable}