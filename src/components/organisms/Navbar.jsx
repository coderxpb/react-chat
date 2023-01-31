import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import localClasses from "./navbar.module.scss";
import { MdArrowBack } from "react-icons/md";
import { useChat } from "../../context/ChatContext";

const Navbar = (props) => {
  const { width } = props;

  const { data, dispatch } = useChat();
  const clickHandler = () => {
    dispatch({ type: "CLOSE_CHAT", payload: {} });
  };
  return (
    <div className={localClasses.navbar}>
      {width <= 550 && data.chatId != "null" ? (
        <>
          <MdArrowBack
            onClick={clickHandler}
            className={localClasses.backButton}
          />
          <p className={localClasses.title}>React-Chat</p>
        </>
      ) : (
        <>
          <p className={localClasses.title}>React-Chat</p>
          <button className={localClasses.button} onClick={() => signOut(auth)}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
