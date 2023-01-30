import React, { useState } from "react";
import classes from "../style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import FlashMessage from "../components/atoms/FlashMessage";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [status, setStatus] = useState({ showStatus: false });
  const navigate = useNavigate();

  const onLogin = (isSuccess) => {
    setStatus({
      showStatus: !isSuccess,
      status: isSuccess,
      value: isSuccess ? "Logged In." : "Something went wrong.",
    });

    setTimeout(() => {
      setStatus({ showStatus: false });
    }, 5000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      onLogin(false);
    }
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
                type="password"
                minLength={6}
                required
                placeholder="Enter your password"
                className={`${classes.formInput} ${classes.formInputText}`}
              />
            </label>
            <button className={classes.formButton}>Log In</button>
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
