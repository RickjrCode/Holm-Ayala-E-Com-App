import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./api/ajaxHelper";
import {
  Account,
  Bitters,
  Login,
  Navigation,
  Register,
  Home,
  Shrubs,
  Cart,
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
        <Route path="/bitters" element={<Bitters />} />
        <Route path="/shrubs" element={<Shrubs />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
