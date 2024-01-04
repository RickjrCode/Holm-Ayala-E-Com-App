import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Account,
  Bitters,
  Login,
  Navigation,
  Register,
  Home,
} from "./components";

import React from "react";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bitters" element={<Bitters />} />
      </Routes>
    </>
  );
}

export default App;
