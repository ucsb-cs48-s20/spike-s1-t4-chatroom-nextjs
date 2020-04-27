import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';

import "./TextContainer.scss";


// messages is the box containing message components
// draws message components from the messages array in chat.js
// unique to each chat room
const TextContainer = (props) => {
    return(
        <div className="textContainer">
            <h1>In Lobby:</h1>
        </div>
    );
};

export default TextContainer;