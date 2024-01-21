<<<<<<< HEAD
import "./App.css";
=======

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
} from "./components";
>>>>>>> 4f543489f75472123f144422ba12fe42c5b840ba

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
      </Routes>
    </>
  );
}

export default App;
