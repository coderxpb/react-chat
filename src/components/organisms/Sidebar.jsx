import React from "react";
import Search from "../atoms/Search";
import UserCard from "../molecules/UserCard";
import localClasses from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={localClasses.sidebar}>
      <Search />
      <div className={localClasses.div}>
        <UserCard
          userName="Pankaj"
          userChat="Hello adksfj kasjflk asjlfj a;slfkj alskfj laksdjf lkasjfkl jasldkfj lkasdjf lkasdjfl kas;dfk asdjf lkasjdkfl jlaksjf lksajfdl kjaslkdfj lkasjf "
        />
      </div>
    </div>
  );
};

export default Sidebar;
