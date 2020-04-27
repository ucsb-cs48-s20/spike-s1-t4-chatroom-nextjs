import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./Messages.scss";


// messages is the box containing message components
// draws message components from the messages array in chat.js
// unique to each chat room
const Messages = (props) => {
    return(
        <ScrollToBottom className="messages">
        </ScrollToBottom>
    );
};

export default Messages;