import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import classes from "../../style.module.scss";
import userClasses from "../molecules/usercard.module.scss";
import localClasses from "./search.module.scss";
import { db } from "../../firebase";
const Search = () => {
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState(null);
  const searchHandler = async (e) => {
    if (e.code == "Enter") {
      console.log(email);
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("name", "==", email));
      try {
        const users = await getDocs(q);
        console.log(users);
        users.forEach((doc) => setNewUser(doc.data()));
      } catch (error) {
        console.log(error);
        console.log(newUser);
      }
      console.log(newUser);
    }
  };

  return (
    <div className={localClasses.search}>
      <div className={localClasses.searchForm}>
        <input
          type="text"
          placeholder="Enter email and press return"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={searchHandler}
          value={email}
          className={`${classes.formInputText} ${localClasses.searchFormInput}`}
        />
      </div>

      {newUser && (
        <div className={`${userClasses.userCard} ${localClasses.userCard}`}>
          <img
            className={userClasses.userImage}
            alt="Default-avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
          />
          <div className={userClasses.userCardChat}>
            <span className={userClasses.userCardTitle}>{newUser.name}</span>
            {/* <span className={classes.userCardSubtitle}>Hey about that </span> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
