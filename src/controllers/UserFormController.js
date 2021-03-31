import axios from "axios";

export function PriceRange(data){
    console.log(data);
    this.setState({test:data}, console.log(this.state))
}

export function getEventName() {
    // replace with whatever your api controllers is.
    return axios
        .post("http://localhost:9000/getEventName", { eventDetail: this.props.eventCode })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        })
}
export function handleChange(event , name) {
    this.setState({[name]: event.target.value});
    console.log(event.target.value, [name])
}
export function handleCuisineChange(data){
    console.log(data)
    this.setState({userCuisine: data })

}

export function handleBudgetChange(event){
    this.setState({userBudget: event })
}
export function handleTimetable(value){
    this.setState({userTiming: value})
}