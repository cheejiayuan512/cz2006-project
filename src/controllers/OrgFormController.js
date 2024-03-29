import axios from "axios";

export function handleChange(event , name) {
    this.setState({[name]: event.target.value});
    console.log(event.target.value, [name])
}
export function incrementPax(value){
    if (value<25) {
        this.setState((prevState) => ({ headCount: prevState.headCount + 1 }))
    }
}
export function decrementPax(value){
    if (value>=3) {
        this.setState((prevState) => ({ headCount: prevState.headCount - 1 }))
    }
}
export function handleChangeDate(startDate, endDate, label) {
    console.log(startDate, endDate, label)
    this.setState({startDate:startDate.format("MM/DD/YYYY"), endDate:endDate.format("MM/DD/YYYY")});
}

export function MapData(data){
    this.setState({location:data});
}
export function onSubmit(e) {
    e.preventDefault();
    axios
        .post("http://localhost:9000/eventCreation", { eventDetail: this.state })
        .then((res) => {
            console.log(res.data);
            console.log('function called')
            return res.data;

        })
        .catch((err) => {
            console.log(err);
        }).then(result => {
        console.log(result)
        this.setState({eventCode: result})
    });
}