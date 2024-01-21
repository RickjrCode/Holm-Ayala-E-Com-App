import React from "react";
import { registerUser } from "../api/ajaxHelper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import drinkLogo from "../assets/bitters-drink.png";

export default function Register({ setToken }) {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      username,
      password,
    };

    try {
      const token = await registerUser(userObj);
      console.log(userObj);
      setToken(token);
      navigate("/account");
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle registration error (e.g., display an error message)
    }
  }
  return (
    <div className="register-form">
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
          />
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
          <i className="fa-solid fa-paper-plane"></i>Register
        </button>
      </form>
    </div>
  );
}
