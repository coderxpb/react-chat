import React from "react";
import localClasses from "./chatinput.module.scss";
import { MdSend } from "react-icons/md";
const ChatInput = (props) => {
  return (
    <div className={localClasses.container}>
      <input
        type="text"
        className={localClasses.input}
        placeholder="Enter message"
      />
      <MdSend className={localClasses.icon} />
    </div>
  );
};

export default ChatInput;
