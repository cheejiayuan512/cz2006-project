import axios from "axios";

export function PriceRange(data){
    console.log(data);
    this.setState({test:data}, console.log(this.state))
}


export function handleChange(event , name) {
    this.setState({[name]: event.target.value});
    console.log(event.target.value, [name])
}