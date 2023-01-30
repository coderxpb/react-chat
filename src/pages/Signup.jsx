import React, { useState } from "react";
import FlashMessage from "../components/atoms/FlashMessage";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import classes from "../style.module.scss";

const Signup = () => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState({ showStatus: false });

  const onSignup = (isSuccess) => {
    setStatus({
      showStatus: true,
      status: isSuccess,
      value: isSuccess ? "Signed up successfully." : "Something went wrong.",
    });

    setTimeout(() => {
      setStatus({ showStatus: false });
    }, 5000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      onSignup(true);
    } catch (error) {
      onSignup(false);
    }
  };

  return (
    <div className={`${classes.page} ${classes.pageCentered}`}>
      {status.showStatus && <FlashMessage status={status} />}
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

          {error && <p className={classes.error}>Something went wrong</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
