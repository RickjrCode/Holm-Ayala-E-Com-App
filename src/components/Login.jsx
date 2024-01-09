import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/ajaxHelper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      email,
      password,
    };
    const token = await loginUser(userObj);
    setToken(token);
    navigate("/account");
    console.log(userObj);
  }
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />{" "}
          <label for="email">
            <i class="fa-solid fa-envelope"></i> Email
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
          <label>
            <i class="fa-solid fa-lock"></i> Password
          </label>
        </div>
        <button type="submit">
          <i class="fa-solid fa-right-to-bracket"></i> Login
        </button>
      </form>
    </div>
  );
}
