
import "./App.css";


import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/ajaxHelper";
import { UserProvider } from "./userContext";
import {
  Account,
  Bitters,
  Login,
  Navigation,
  Register,
  Home,
  Shrubs,
  Cart,
  Checkout,
} from "./components";


import React from "react";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function fetchUser() {
    if (!token) return;
    const nextUser = await getUser(token);
    console.log(nextUser);
    setUser(nextUser);
  }
  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/bitters"
          element={<Bitters token={token} userId={user?.id} />}
        />
        <Route path="/shrubs" element={<Shrubs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
