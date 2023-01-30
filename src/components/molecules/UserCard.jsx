import React from "react";
import localClasses from "./usercard.module.scss";

const UserCard = (props) => {
  const { userName, userChat, clickHandler } = props;
  return (
    <div className={`${localClasses.userCard}`} onClick={clickHandler}>
      <img
        className={localClasses.userImage}
        alt="Default-avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
      />
      <div className={localClasses.userCardChat}>
        <span className={localClasses.userCardTitle}>{userName}</span>
        <span className={localClasses.userCardSubtitle}>{userChat} </span>
      </div>
    </div>
  );
};

export default UserCard;
