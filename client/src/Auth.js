import React, { useEffect, useState } from "react";
import Spinner from "./components/loading-spinner";
import UserContext from "./Context";
import getCookie from "./utils/getCookie";

const Auth = (props) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const logIn = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const logOut = () => {
    document.cookie = "auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = getCookie("auth-token");

    if (!token) {
      logOut();
      return;
    }

    fetch("http://localhost:3333/api/user/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((promise) => {
        return promise.json();
      })
      .then((response) => {
        if (response.status) {
          logIn({
            username: response.user.username,
            id: response.user._id,
            userInfo: response.user,
          });
        } else {
          logOut();
        }
      });
  }, []);

  if (loggedIn === null) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        user,
        logIn,
        logOut,
      }}
    >
      <div>{props.children}</div>
    </UserContext.Provider>
  );
};

export default Auth;
