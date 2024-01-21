import { Link } from "react-router-dom";
import drinkLogo from "../assets/bitters-drink.png";
import React, { useState } from "react";
import "../Hamburger.css";

const Hamburger = ({ isMenuOpen, toggleMenu }) => (
  <div className={`menu-icon ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
  </div>
);

export default function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <div className="logo">
          <h1>BITTER DAYS</h1>
        </div>

        <ul className={`menu-items ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to={"/"} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/account"} onClick={toggleMenu}>
              Account
            </Link>
          </li>
          <li>
            <Link to={"/login"} onClick={toggleMenu}>
              Log In
            </Link>
          </li>
          <li>
            <Link to={"/register"} onClick={toggleMenu}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to={"/bitters"} onClick={toggleMenu}>
              Our Bitters
            </Link>
          </li>
          <Link to={"/shrubs"} onClick={toggleMenu}>
            Our Shrubs
          </Link>
        </ul>
      </nav>

      {/* <img id="logo-img" src={drinkLogo} alt="Drink Logo" /> */}
    </>
  );
}
