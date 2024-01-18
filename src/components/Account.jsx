import React from "react";
import drinkMoreVid from "../assets/more-drinks.mp4";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="account">
      <div className="account-overlay">
        <video src={drinkMoreVid} autoPlay loop muted />
        <div className="overlay"></div>
        <div className="account-content">
          <h2>Looks like you don't have an account</h2>

          <Link to="/register">
            <button className="btn btn1">Register Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
