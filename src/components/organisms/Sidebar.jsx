import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import { db } from "../../firebase";
import Search from "../atoms/Search";
import UserCard from "../molecules/UserCard";
import localClasses from "./sidebar.module.scss";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user.uid && getChats();
  }, [user.uid]);

  const clickHandler = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };
  return (
    <div className={localClasses.sidebar}>
      <Search />
      <div className={localClasses.div}>
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <UserCard
              key={chat[0]}
              userName={chat[1].userInfo.name}
              userChat={chat[1].lastMessage?.text}
              clickHandler={() => {
                clickHandler(chat[1].userInfo);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
