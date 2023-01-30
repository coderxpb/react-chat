import React, { useState, useEffect } from "react";
import Message from "../atoms/Message";
import ChatInput from "../atoms/ChatInput";
import localStyles from "./chat.module.scss";
import { useChat } from "../../context/ChatContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/UserContext";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const { data } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className={localStyles.chat}>
      {data && (
        <>
          <div className={localStyles.chatHeader}>{data.user.name}</div>
          <div className={localStyles.chatMessages}>
            {messages.map((m) => (
              <Message message={m} key={m.id} />
            ))}
          </div>
          <div className={localStyles.Input}>
            <ChatInput />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
