import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader";

function App() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);

  
  useEffect(() => {
    let isLoggedInValue = localStorage.getItem('isLoggedIn');
    if(isLoggedInValue === '1') {
      updateIsLoggedIn(true);
    };
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    updateIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    updateIsLoggedIn(false);
  };

  return <React.Fragment>
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}></MainHeader>
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler}></Login>}
      {isLoggedIn && <Home onLogout={logoutHandler}></Home>}
    </main>
  </React.Fragment>;
}

export default App;
