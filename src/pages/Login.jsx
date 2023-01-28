import React from "react";
import classes from "../style.module.scss";
const Signup = () => {
  return (
    <div className={`${classes.page} ${classes.pageCentered}`}>
      <div className={classes.center}>
        <div className={classes.formWrapper}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.subtitle} style={{ marginBottom: "16px" }}>
            Please enter your details.
          </p>
          <form className={classes.form}>
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
              Password
              <input
                type="password"
                minLength={6}
                required
                placeholder="Enter your password"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <button className={classes.formButton}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
