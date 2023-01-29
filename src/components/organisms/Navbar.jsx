import React from "react";
import localClasses from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={localClasses.navbar}>
      <p className={localClasses.title}>React-Chat</p>
      <button className={localClasses.button}>Log Out</button>
    </div>
  );
};

export default Navbar;
