import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import localClasses from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={localClasses.navbar}>
      <p className={localClasses.title}>React-Chat</p>
      <button className={localClasses.button} onClick={() => signOut(auth)}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
