import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import classes from "../../style.module.scss";
import userClasses from "../molecules/usercard.module.scss";
import localClasses from "./search.module.scss";
import { db } from "../../firebase";
import { useAuth } from "../../context/UserContext";
const Search = () => {
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState(null);
  const { user } = useAuth();
  const searchHandler = async (e) => {
    if (e.code == "Enter") {
      setNewUser(null);

      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      try {
        const users = await getDocs(q);
        users.forEach((doc) => setNewUser(doc.data()));
      } catch (error) {
        setNewUser(null);
      }
    }
  };

  const selectHandler = async (e) => {
    //unique id which is used to find chats between two users
    const combinedId =
      user.uid > newUser.uid ? user.uid + newUser.uid : newUser.uid + user.uid;
    try {
      const data = await getDoc(doc(db, "chats", combinedId));
      if (!data.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: newUser.uid,
            name: newUser.name,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", newUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setNewUser(null);
    setEmail("");
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
        <div
          className={`${userClasses.userCard} ${localClasses.userCard}`}
          onClick={selectHandler}
        >
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
