import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";
import localClasses from "./message.module.scss";
const Message = (props) => {
  const { message } = props;
  const { data } = useChat();
  const { user } = useAuth();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  }, [message]);

  const name = user.uid == message.senderId ? null : data.user.name;
  return (
    <div className={name ? localClasses.other : localClasses.self} ref={ref}>
      <p className={name ? localClasses.otherName : localClasses.selfName}>
        {name ? name : "You"}
      </p>
      <p className={name ? localClasses.otherMessage : localClasses.selfMessage}>
        {message.text}
      </p>
    </div>
  );
};

export default Message;
