import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import io from "socket.io-client";

// Styling
import "./ChatLayout.scss";

// Components
import InfoBar from './InfoBar.js';
import Input from './Input.js';
import Messages from './Messages.js';
import TextContainer from './TextContainer.js';

let socket;

const Chat = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";
    const Router = useRouter(); // useRouter hook, gets information each time page rendered

    // custom hook that sets name and room everytime Router object changes
    useEffect(() => {
        const { name, room } = Router.query;

        setName(name);
        setRoom(room);
    }, [Router]);

    return (
        <div className="outerContainer">

            <div className="container">
                <InfoBar room={room} />
                <Messages />
                <Input />
            </div>
            <TextContainer />
            <h1>BRRRR</h1>
        </div>
    );
};


/*
<div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
*/
export default Chat;
