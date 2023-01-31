import React, { useState } from "react";
import classes from "../style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import FlashMessage from "../components/atoms/FlashMessage";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [status, setStatus] = useState({ showStatus: false });
  const [signupInProcess, setSignupInProcess] = useState(false);

  const navigate = useNavigate();

  const onLogin = (isSuccess, failureMessage = "Something went wrong") => {
    setStatus({
      showStatus: !isSuccess,
      status: isSuccess,
      value: isSuccess ? "Logged In" : failureMessage,
    });

    setTimeout(() => {
      setStatus({ showStatus: false });
    }, 5000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setSignupInProcess(true);

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
      navigate("/");
    } catch (error) {
      onLogin(false, error.message);
      setSignupInProcess(false);
    }
    setSignupInProcess(false);
  };

  return (
    <div className={`${classes.page} ${classes.pageCentered}`}>
      {status.showStatus && <FlashMessage status={status} />}
      <div className={classes.center}>
        <div className={classes.formWrapper}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.subtitle} style={{ marginBottom: "16px" }}>
            Please enter your details.
          </p>
          <form className={classes.form} onSubmit={submitHandler}>
            <label className={classes.formLabel}>
              Email
              <input
                disabled={signupInProcess}
                type="email"
                minLength={3}
                required
                placeholder="Enter your email"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <label className={classes.formLabel}>
              Password
              <input
                disabled={signupInProcess}
                type="password"
                minLength={6}
                required
                placeholder="Enter your password"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <button className={classes.formButton}>
              {signupInProcess ? "Logging in" : "Login"}
            </button>
          </form>
          <p
            className={classes.subtitle}
            style={{ marginTop: "12px", fontSize: "12px" }}
          >
            Don't have an account?{" "}
            <Link to="/signup">
              <strong style={{ color: "#229954" }}>Sign Up!</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
