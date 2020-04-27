import React from 'react';

import "./Input.scss";

// event object contains info about details of the event
const Input = (props) => {
    return(
        <form className="form">
            <input
            className="input"
            type="text"
            placeholder="Type a message..."
            />
            <button className="sendButton">Send</button>
        </form>
    );
};

export default Input;