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
    if (value>=2) {
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