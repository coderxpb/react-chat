import React from "react";
import Sidebar from "../components/organisms/Sidebar";
import Chat from "../components/organisms/Chat";
import Navbar from "../components/organisms/Navbar";
import localClasses from "./home.module.scss";
import { useAuth } from "../context/UserContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className={localClasses.home}>
      {user.displayName}
      <Navbar />
      <div className={localClasses.homeContainer}>
        <Sidebar />

        <Chat />
      </div>
    </div>
  );
};

export default Home;
