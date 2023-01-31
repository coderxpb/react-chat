import React, { useEffect, useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import Chat from "../components/organisms/Chat";
import Navbar from "../components/organisms/Navbar";
import localClasses from "./home.module.scss";
import _ from "lodash";
import { useChat } from "../context/ChatContext";

const Home = () => {
  const [width, setWidth] = useState(window.screen.availWidth);
  const { data } = useChat();
  useEffect(() => {
    const handleResize = _.debounce(
      () => setWidth(window.screen.availWidth),
      100
    );
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={localClasses.home}>
      <Navbar width={width} />
      <div className={localClasses.homeContainer}>
        {(width > 550 || data.chatId == "null") && <Sidebar />}
        {(width > 550 || data.chatId != "null") && <Chat />}
      </div>
    </div>
  );
};

export default Home;
