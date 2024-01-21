import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../Context/AuthContext";

// import Card from '../UI/Card/Card';
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../Input/input";

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

  let emailRef = useRef();
  let passwordRef = useRef();

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
    if (formIsValid) {
      authctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailRef.current.onfocus();
    } else {
      passwordRef.current.onfocus();
    }
  };

  return (
    // <Card className={classes.login}>
    <>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          type="email"
          id="email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChangeHandler={emailChangeHandler}
          onBlurHandler={validateEmailHandler}
        >
          E-mail
        </Input>
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChangeHandler={passwordChangeHandler}
          onBlurHandler={validatePasswordHandler}
        >
          Password
        </Input>
        <div className={classes.action}>
          <Button
            type="submit"
            className={classes.btn}
            // disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </>
    // </Card>
  );
};

export default Login;
