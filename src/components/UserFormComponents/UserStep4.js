import {Button, Card, CardDeck, CardGroup, CardImg, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import indian  from '../../assets/indian.png' // relative path to image
import chinese from '../../assets/chinese.png'
import korean from '../../assets/korean.png'
import thai from '../../assets/thai.png'
import malay from '../../assets/malay.png'
import japanese from '../../assets/japanese.png'
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
        //

    }
    return <Card id={props.id}  className={'m-1'} onClick={sendData}>

        <Card.Img id={props.id} src={props.img}/>
        <Card.Body id={props.id} className={colour}>
            <Card.Title id={props.id}>{props.title}</Card.Title>
            <Card.Text id={props.id}>{props.flavourText}</Card.Text>

        </Card.Body>
        </Card>;
}

export function UserStep4(props) {
    const [cuisineList, setCuisineList] = useState([])
    useEffect(() =>
        props.sendDataToParent(cuisineList), [cuisineList])
    return <Form>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>Choose your preferred
            cuisines!</Form.Label>
        <CardGroup>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'chinese'} img={chinese} title={'Chinese'} flavourText={'Mala, Dim Sum, Congee and Zi Char'} />
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'indian'} img={indian} title='Indian' flavourText='Butter Chicken, Prata, Curries and Naan' onChange={props.onChange}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'japanese'} img={japanese} title={'Japanese'} flavourText={'Ramen, Sushi, Donburi and Okonomiyaki'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'korean'} img={korean} title={'Korean'} flavourText={'KBBQ,Fried Chicken, Jjajangmyeon and Bibimbap'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'malay'} img={malay} title={'Malay'} flavourText={'Nasi Goreng, Rendang, Mee Siam and Satay'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'thai'} img={thai} title={'Thai'} flavourText={'Mookata, , Pad Thai, Tom Yum and Mango Salad'}/>
            <CuisineCard parentFoodArray={cuisineList} parentSetFunction={setCuisineList} id={'dessert'} img={dessert} title={'Dessert'} flavourText={'Bingsu, Ice Cream, Confectionaries and Cakes'}/>
        </CardGroup>
    </Form>
}
