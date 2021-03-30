import {Button, Card, CardDeck, CardGroup, CardImg, Form} from "react-bootstrap";
import React from "react";
import indian  from '../../assets/indian.png' // relative path to image
import chinese from '../../assets/chinese.png'
function CuisineCard(props) {
    return <Card>
        <Card.Img src={props.img}/>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.flavourText}</Card.Text>

        </Card.Body>
        <Card.Footer><Form.Check
            type="checkbox"
            label="I would like to eat here!" onChange={props.onChange}/></Card.Footer>
    </Card>;
}

export function UserStep4(props) {
    return <Form>
        <Form.Label column='lg' className='font-weight-bold'
                    style={{fontSize: "150%"}}>Choose your preferred
            cuisines!</Form.Label>
        <CardDeck>
            <CuisineCard id={'chinese'} img={chinese} title={'Chinese'} flavourText={'Mala, Dim Sum, Congee and Zi Char'}/>
            <CuisineCard id='indian' img={indian} title='Indian' flavourText='Butter Chicken, Prata, Curries and Naan' onChange={props.onChange}/>
            <Card>
                <Card.Img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple5/v4/a9/c8/68/a9c86805-0b34-2b16-ba63-38911d41d56f/source/256x256bb.jpg"/>
                <Card.Body>
                    <Card.Title>Indian</Card.Title>
                    <Card.Text> </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple5/v4/a9/c8/68/a9c86805-0b34-2b16-ba63-38911d41d56f/source/256x256bb.jpg"/>
                <Card.Body>
                    <Card.Title>Indian</Card.Title>
                    <Card.Text> Hi </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple5/v4/a9/c8/68/a9c86805-0b34-2b16-ba63-38911d41d56f/source/256x256bb.jpg"/>
                <Card.Body>
                    <Card.Title>Indian</Card.Title>
                    <Card.Text> Hi </Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>
    </Form>
}
