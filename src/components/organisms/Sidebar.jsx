import React from "react";
import Search from "../atoms/Search";
import localClasses from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={localClasses.sidebar}>
      <div></div>
      <Search />
    </div>
  );
};

export default Sidebar;
