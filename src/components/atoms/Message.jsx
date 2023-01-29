import React from "react";
import localClasses from "./message.module.scss";
const Message = (props) => {
  const { name, message } = props;
  return (
    <div className={name ? localClasses.other : localClasses.self}>
      <p className={name ? localClasses.otherName : localClasses.selfName}>
        {name ? name : "You"}
      </p>
      <p className={name ? localClasses.otherMessage : localClasses.selfMessage}>
        {message}
      </p>
    </div>
  );
};

export default Message;
