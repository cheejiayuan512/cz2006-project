import {Button, Card, CardColumns, CardDeck, CardGroup, CardImg, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import indian  from '../../assets/indian.png' // relative path to image
import chinese from '../../assets/chinese.png'
import korean from '../../assets/korean.png'
import thai from '../../assets/thai.png'
import malay from '../../assets/malay.png'
import japanese from '../../assets/japanese.png'
import western from '../../assets/western.png'
import cafe from '../../assets/cafe.png'
import dessert from '../../assets/dessert.png'

function CuisineCard(props) {
    const [colour, setColour] = useState('')
    const sendData =(event)=>{
        // change colour
        if (colour === '') {
            setColour('bg-info', props.parentSetFunction(oldArray => [...oldArray, event.target.id]))
        }
        else{
            setColour('',props.parentSetFunction(props.parentFoodArray.filter(item => item !== event.target.id)))
        }
    }
    return <Card id={props.id}  className={'m-1'} onClick={sendData}>

        <Card.Img id={props.id} className={'border-top border-left, border-right'} src={props.img}/>
        <Card.Body id={props.id} className={colour}>
            <Card.Title id={props.id} >{props.title}</Card.Title>
            <Card.Text id={props.id}>{props.flavourText}</Card.Text>

        </Card.Body>
        </Card>;
}

export function UserStep4(props) {
    const [cuisineList, setCuisineList] = useState([])
    useEffect(() =>
        props.sendDataToParent(cuisineList), [cuisineList])
    return <div>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>Choose your preferred
            cuisines!</Form.Label>
            <div style={{overflowY: "scroll", height:'50vh'}}>
        <CardColumns>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Chinese'} img={chinese} title={'Chinese'} flavourText={'Mala, Dim Sum, Congee, Zi Char'} />
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Indian'} img={indian} title='Indian' flavourText={'Butter Chicken, Prata, Curries, Naan'} onChange={props.onChange}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Japanese'} img={japanese} title={'Japanese'} flavourText={'Ramen, Sushi, Donburi, Okonomiyaki'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Korean'} img={korean} title={'Korean'} flavourText={'KBBQ,Fried Chicken, Jjajangmyeon, Bibimbap'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Malay'} img={malay} title={'Malay'} flavourText={'Nasi Goreng, Rendang, Mee Siam, Satay'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Thai'} img={thai} title={'Thai'} flavourText={'Mookata, Pad Thai, Tom Yum, Mango Salad'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Western'} img={western} title={'Western'} flavourText={'Steak, Spaghetti, Risotto, Fish & Chips, Pizza'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Cafe'} img={cafe} title={'Cafe'} flavourText={'Coffee, Sandwiches, Wraps'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'Dessert'} img={dessert} title={'Dessert'} flavourText={'Bingsu, Ice Cream, Confectionaries, Cakes'}/>
        </CardColumns>
            </div>
    </div>
}
