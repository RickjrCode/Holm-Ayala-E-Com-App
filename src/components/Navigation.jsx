import { Link } from "react-router-dom";
import drinkLogo from "../assets/bitters-drink.png";

import React from "react";

export default function Navigation() {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>
            {" "}
            Bitter Days <img className="logo-image" src={drinkLogo} />{" "}
          </h1>
        </div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/bitters">Our Bitters</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
