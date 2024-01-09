import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="name"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label for="name">
            <i class="fa-solid fa-user"></i>First Name
          </label>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="name"
            required
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <label for="name">
            <i class="fa-solid fa-user"></i>Last Name
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
          <label for="email">
            <i class="fa-solid fa-envelope"></i>Email
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
            <i class="fa-solid fa-lock"></i>Password
          </label>
        </div>
        <button type="submit">
          <i class="fa-solid fa-paper-plane"></i>Register
        </button>
      </form>
    </div>
  );
}
