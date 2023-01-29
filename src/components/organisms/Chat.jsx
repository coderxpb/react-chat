import React from "react";
import Message from "../atoms/Message";
import ChatInput from "../atoms/ChatInput";
import Search from "../atoms/Search";
import localStyles from "./chat.module.scss";
const Chat = (props) => {
  return (
    <div className={localStyles.chat}>
      <div className={localStyles.chatMessages}>
        <Message name="Piyush" message="Hey Pankaj" />
        <Message message="Hello" />
      </div>
      <div className={localStyles.Input}>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
