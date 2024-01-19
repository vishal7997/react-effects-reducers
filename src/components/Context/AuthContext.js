import React from "react";

let AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: undefined,
});

export default AuthContext;
