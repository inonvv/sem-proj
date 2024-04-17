import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router";
import { StoryPart } from "./pages/StoryPart/StoryPart";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { createContext, useEffect, useMemo, useState } from "react";
//? SET history for current user
export const setUserHistory = (username, urlPath, prevArr) => {
  let users = JSON.parse(localStorage.getItem("users"));
  //!
  users = users.map((user) => {
    if (user.username == username) {
      user.history = urlPath;
      user.prevArr = prevArr;
    }
    return user;
  });
  localStorage.setItem("users", JSON.stringify(users));
};
//? SET login for exist user

export const bringUser = (username, password) => {
  if (!localStorage.getItem("users")) {
    return false;
  }
  let users = JSON.parse(localStorage.getItem("users"));
  let cu = users.filter((user) => {
    if (user.username == username) {
      return true;
    } else {
      return false;
    }
  });

  if (cu.length == 0) {
    return "user do not exist";
  } else {
    if (cu[0].password != password) {
      return "password not valid";
    }

    return cu[0];
  }
};

//! contain the funcs above
export const UserContext = createContext({
  userName: "",
  setUserName: () => {},
  setUserHistory: setUserHistory,
  bringUser: bringUser,
});

function App() {
  const [userName, setUserName] = useState("");
  const value = useMemo(
    () => ({ userName, setUserName, setUserHistory, bringUser }),
    [userName]
  );
  useEffect(() => {
    if (localStorage.getItem("CurrentUser")) {
      const cu = JSON.parse(localStorage.getItem("CurrentUser"));
      setUserName(cu.username);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/StoryPart" element={<StoryPart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
