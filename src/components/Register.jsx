import React from "react";
import { registerUser } from "../api/ajaxHelper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import drinkLogo from "../assets/bitters-drink.png";

export default function Register({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      firstName,
      lastName,
      email,
      password,
    };
    const token = await registerUser(userObj);
    setToken(token);
    navigate("/account");
    console.log(userObj);
  }

  return (
    <div className="register-form">
      <img id="logo-img" src={drinkLogo} alt="Drink Logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label htmlFor="name">
            <i className="fa-solid fa-user"></i> First Name
          </label>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <label htmlFor="name">
            <i className="fa-solid fa-user"></i> Last Name
          </label>
        </div>
        <div className="input-group">
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
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
