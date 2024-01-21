import React, { useContext } from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/Context/AuthContext";
// import Demo from "./components/ReducerDemo/Demo";

function App() {
  let ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader></MainHeader>
      <main>
        {!ctx.isLoggedIn && <Login></Login>}
        {ctx.isLoggedIn && <Home></Home>}
      </main>
    </>
  );
}

export default App;
