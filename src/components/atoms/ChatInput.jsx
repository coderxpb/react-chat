import React, { useState } from "react";
import localClasses from "./chatinput.module.scss";
import { MdSend } from "react-icons/md";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import { db } from "../../firebase";

const ChatInput = (props) => {
  const [text, setText] = useState("");
  const { data } = useChat();
  const { user } = useAuth();

  const clickHandler = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  const keyHandler = async (e) => {
    if (e.code == "Enter") {
      clickHandler();
    }
  };
  return (
    <div className={localClasses.container}>
      <input
        type="text"
        className={localClasses.input}
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyHandler}
      />
      <MdSend className={localClasses.icon} onClick={clickHandler} />
    </div>
  );
};

export default ChatInput;
