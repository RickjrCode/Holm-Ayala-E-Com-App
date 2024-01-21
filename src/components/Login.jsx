import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/ajaxHelper";
import drinkLogo from "../assets/bitters-drink.png";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      username,
      password,
    };
    const token = await loginUser(userObj);
    setToken(token);
    navigate("/account");
    console.log(userObj);
  }
  return (
    <div className="login-form">
      <img id="logo-img" src={drinkLogo} alt="Drink Logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="email"
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />{" "}
          <label htmlFor="email">
            <i className="fa-solid fa-envelope"></i> Email
          </label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label htmlFor="password">
            <i className="fa-solid fa-lock"></i> Password
          </label>
        </div>
        <button type="submit">
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </button>
      </form>
    </div>
  );
}
