import React, {useState} from 'react';
import './App.css';
import TextBox from './TextBox';
//@ts-ignore
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import axios from 'axios';


function Horoscope() {
    const [sun, setSun] = React.useState("");
    const [moon, setMoon] = React.useState("");
    const [rising, setRising] = React.useState("");

    const [horoscope, setHoroscope] = React.useState([]);

    const requestHoroscope = () => {
        const toSend = {
            //TODO: Pass in the values for the data. Follow the format the route expects!
            "sun": sun,
            "moon": moon,
            "rising": rising,
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post('http://localhost:4567/horoscope', toSend, config)
            .then(response => {
                console.log(response.data);
                //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
                //Note: It is very important that you understand how this is set up and why it works!
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Horoscope</h1>
            <TextBox label={"Sun Sign"} change={setSun}/>
            <TextBox label={"Moon Sign"} change={setMoon}/>
            <TextBox label={"Rising Sign"} change={setRising}/>
            <AwesomeButton type="primary" onPress={requestHoroscope}>Button</AwesomeButton>;
            {horoscope.map((trait: String) => <p>{trait}</p>)}
        </div>
    );
}

export default Horoscope;