import React, { useState } from "react";
import FlashMessage from "../components/atoms/FlashMessage";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import classes from "../style.module.scss";

const Signup = () => {
  const [status, setStatus] = useState({ showStatus: false });
  const [signupInProcess, setSignupInProcess] = useState(false);
  const navigate = useNavigate();
  const onSignup = (isSuccess, failureMessage = "Something went wrong") => {
    setStatus({
      showStatus: true,
      status: isSuccess,
      value: isSuccess ? "Signed up successfully." : failureMessage,
    });

    setTimeout(() => {
      setStatus({ showStatus: false });
    }, 5000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    setSignupInProcess(true);
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(data.user, { displayName: name });
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        name,
        email,
      });
      await setDoc(doc(db, "userChats", data.user.uid), {});
      onSignup(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      onSignup(false, error.message);
      setSignupInProcess(false);
    }
    setSignupInProcess(false);
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
                disabled={signupInProcess}
              />
            </label>

            <label className={classes.formLabel}>
              Email
              <input
                type="email"
                required
                placeholder="Enter your email"
                className={`${classes.formInput} ${classes.formInputText}`}
                disabled={signupInProcess}
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
                disabled={signupInProcess}
              />
            </label>
            <button className={classes.formButton} disabled={signupInProcess}>
              {signupInProcess ? "Signing Up" : "Sign Up"}
            </button>
          </form>
          <p
            className={classes.subtitle}
            style={{ marginTop: "12px", fontSize: "12px" }}
          >
            Already have an account?{" "}
            <Link to="/login">
              <strong style={{ color: "#229954" }}>Login!</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
