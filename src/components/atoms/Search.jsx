import React, { useState } from "react";
import classes from "../../style.module.scss";
import userClasses from "../molecules/usercard.module.scss";
import localClasses from "./search.module.scss";
const Search = () => {
  const [username, setUsername] = useState("");

  return (
    <div className={localClasses.search}>
      <div className={localClasses.searchForm}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={`${classes.formInputText} ${localClasses.searchFormInput}`}
        />
      </div>

      <div className={`${userClasses.userCard} ${localClasses.userCard}`}>
        <img
          className={userClasses.userImage}
          alt="Default-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
        />
        <div className={userClasses.userCardChat}>
          <span className={userClasses.userCardTitle}>Pankaj</span>
          {/* <span className={classes.userCardSubtitle}>Hey about that </span> */}
        </div>
      </div>
    </div>
  );
};

export default Search;
