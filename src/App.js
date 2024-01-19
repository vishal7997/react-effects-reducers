import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/Context/AuthContext";
// import Demo from "./components/ReducerDemo/Demo";

function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  useEffect(() => {
    let isLoggedInValue = localStorage.getItem("isLoggedIn");
    if (isLoggedInValue === "1") {
      updateIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    updateIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    updateIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <MainHeader></MainHeader>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler}></Login>}
        {isLoggedIn && <Home onLogout={logoutHandler}></Home>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
