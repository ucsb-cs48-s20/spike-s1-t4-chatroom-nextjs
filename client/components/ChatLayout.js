import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import io from "socket.io-client";

// Styling
import "./ChatLayout.scss";

// Components
import InfoBar from "./InfoBar.js";
import Input from "./Input.js";
import Messages from "./Messages.js";
import TextContainer from "./TextContainer.js";

let socket;

const Chat = (props) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";
    socket = io(ENDPOINT);
    const Router = useRouter(); // useRouter hook, gets information each time page rendered

    // custom hook that sets name and room everytime Router object changes
    useEffect(() => {
        const { name, room } = Router.query;
        //console.log(Router.query);

        setName(name);
        setRoom(room);
        //console.log(name);
        //console.log(room);
        socket.emit("join", { name: name, room: room }, (str) => {
            // if str isn't null, error has occured
            if (str) {
                alert(str);
                Router.push("/");
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [Router, ENDPOINT]);

    useEffect(() => {
        // receive message event from server
        socket.on("message", (message) => {
            console.log("received message.");
            // TODO
        });

        socket.on("roomData", (obj) => {
            console.log("updating room data");
            console.log(obj);
            setUsers(obj.users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        // if message isn't empty
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages />
                <Input />
            </div>
            <TextContainer users={users} />
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
