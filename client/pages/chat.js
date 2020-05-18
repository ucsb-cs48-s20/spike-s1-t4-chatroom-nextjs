import ChatLayout from "../components/ChatLayout.js";
import React from 'react';
import Favicon from 'react-favicon';

const Chat = () => {
  return (
    <div>
      <Favicon url="/static/images/favicon.ico"></Favicon>
      <ChatLayout></ChatLayout>
    </div>
  );
};

export default Chat;