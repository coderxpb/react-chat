import React from "react";
import Sidebar from "../components/organisms/Sidebar";
import Chat from "../components/organisms/Chat";
import Navbar from "../components/organisms/Navbar";

import localClasses from "./home.module.scss";
const Home = () => {
  return (
    <div className={localClasses.home}>
      <Navbar />
      <div className={localClasses.homeContainer}>
        <div>
          <Sidebar />
        </div>

        <div>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
