import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>Bitters</h1>
        </div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"bitters"}>Bitters</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"shrubs"}>Shrubs</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"account"}></Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={""}></Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
