import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import classes from "../style.module.scss";

const Signup = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className={`${classes.page} ${classes.pageCentered}`}>
      <div className={classes.center}>
        <div className={classes.formWrapper}>
          <p className={classes.title}>Hello!</p>
          <p className={classes.subtitle} style={{ marginBottom: "16px" }}>
            Please enter your details.
          </p>
          <form className={classes.form} onSubmit={submitHandler}>
            <label className={classes.formLabel}>
              Name
              <input
                type="text"
                required
                placeholder="Enter your name"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>

            <label className={classes.formLabel}>
              Username
              <input
                type="text"
                minLength={3}
                required
                placeholder="Enter your username"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <label className={classes.formLabel}>
              Email
              <input
                type="email"
                required
                placeholder="Enter your email"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <label className={classes.formLabel}>
              Password
              <input
                type="password"
                minLength={6}
                required
                placeholder="Enter your password"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <button className={classes.formButton}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
