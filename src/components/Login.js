import { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "./Context/AuthContext";

// import Card from '../UI/Card/Card';
// import classes from './Login.module.css';
import Button from "../UI/Button/Button";

function emailReducer(currState, action) {
  switch (action.type) {
    case "EMAIL_INPUT":
      return { value: action.val, isValid: undefined };
    case "EMAIL_VALID":
      return { value: currState.value, isValid: currState.value.includes("@") };
  }
}

function passwordReducer(currState, action) {
  switch (action.type) {
    case "PASSWORD_INPUT":
      return { value: action.val, isValid: undefined };
    case "PASSWORD_VALID":
      return { value: currState.value, isValid: action.val.trim().length > 6 };
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsvalid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  let [emailState, emailDispatcher] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  let [passwordState, passwordDispatcher] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  let authctx = useContext(AuthContext);

  useEffect(() => {
    let value = setTimeout(() => {
      console.log("Validating input fields...");
      setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );
    }, 500);

    // The function which is getting called on return is a Cleanup Function.
    return () => {
      console.log("Cleanup function called");
      clearTimeout(value);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatcher({ val: event.target.value, type: "EMAIL_INPUT" });
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatcher({ val: event.target.value, type: "PASSWORD_INPUT" });
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    emailDispatcher({ val: emailState.value, type: "EMAIL_VALID" });
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.value.trim().length > 6);
    passwordDispatcher({ val: passwordState.value, type: "PASSWORD_VALID" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value);
  };
  return (
    // <Card className={classes.login}>
    <>
      <form onSubmit={submitHandler}>
        <div
        //   className={`${classes.control} ${
        //     emailState.isValid === false ? classes.invalid : ""
        //   }`}
        >
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <div
          // className={`${classes.control} ${
          //   passwordState.isValid === false ? classes.invalid : ""
          // }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div
          // className={classes.action}
          >
            <Button
              type="submit"
              // className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
    // </Card>
  );
};

export default Login;
