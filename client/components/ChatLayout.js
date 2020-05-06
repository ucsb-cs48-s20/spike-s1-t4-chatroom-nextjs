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
    const [myname, setMyname] = useState("");
    const [roomx, setRoomx] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    const Router = useRouter(); // useRouter hook, gets information each time page rendered
    // router is an object!

    // custom hook that sets name and room everytime Router object changes
    // update can be caused by changes to prop and state
    // unmounting before component removed
    useEffect(() => {
        socket = io(ENDPOINT); // no arguments sets connection to whatever endpoint specified on server.js
        // but doesn't work on connection from port specified on npm run dev
        const { name, room } = Router.query;

        setMyname(name); // if effect changes, include in [] to track the change
        setRoomx(room); // or leave out [] entirely

        socket.emit("join", { name: name, room: room }, (str) => {
            // if str isn't null, error has occured
            if (str) {
                alert(str);
                Router.push("/");
            }
        });

        // necessary, or name will be null upon rejoin
        // name will be null upon rejoin because
        // socket connected to
        return () => {
            socket.disconnect();
        };
    }, [Router, ENDPOINT]); // reload effect when router changes

    useEffect(() => {
        // receive message event from server
        socket.on("message", (message) => {
            console.log("received message.");
            setMessages((msgs) => {
                return [...msgs, message];
            });
        });

        socket.on("roomData", (obj) => {
            //console.log("updating room data");
            //console.log(obj);
            setUsers(obj.users);
        });
    }, [Router]); // when router effect changes, need to make new useEffect object
    // or data won't update, obj returned will be null

    const sendMessage = (event) => {
        event.preventDefault();

        // if message isn't empty
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    return (
        <div>
            <Head>
                <title>Chat Sign In</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
            </Head>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={roomx} />
                    <Messages messages={messages} name={myname} />
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
                <TextContainer users={users} />
            </div>
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
