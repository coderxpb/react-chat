import React from "react";
import Sidebar from "../components/organisms/Sidebar";
import Chat from "../components/organisms/Chat";
import Navbar from "../components/organisms/Navbar";
import localClasses from "./home.module.scss";
import { useAuth } from "../context/UserContext";

const Home = () => {
  return (
    <div className={localClasses.home}>
      <Navbar />
      <div className={localClasses.homeContainer}>
        <Sidebar />

        <Chat />
      </div>
    </div>
  );
};

export default Home;
