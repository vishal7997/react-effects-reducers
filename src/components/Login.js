import { useEffect, useState } from "react";

// import Card from '../UI/Card/Card';
// import classes from './Login.module.css';
// import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsvalid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    let value = setTimeout(() => {
        console.log("Validating input fields...");
        setFormIsValid(
          enteredEmail.includes("@") && enteredPassword.trim().length > 6
        );
    }, 500);

    // The function which is getting called on return is a Cleanup Function.
    return () => {
        console.log("Cleanup function called");
        clearTimeout(value);
    }
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };
  const validatePasswordHandler = () => {
    setEmailIsValid(enteredPassword.trim().length > 6);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };
  return (
    // <Card className={classes.login}>
    <>
      <form onSubmit={submitHandler}>
        <div
        //   className={`${classes.control} ${
        //     emailIsvalid === false ? classes.invalid : ""
        //   }`}
        >
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <div
          // className={`${classes.control} ${
          //   passwordIsvalid === false ? classes.invalid : ""
          // }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div
          // className={classes.action}
          >
            {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                Login
            </Button> */}
            <button
              type="submit"
            //   className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
    // </Card>
  );
};

export default Login;
