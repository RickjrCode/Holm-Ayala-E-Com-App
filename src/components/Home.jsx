import React from "react";
import videoDrink from "../assets/drinks.mp4";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home-overlay"></div>
        <video src={videoDrink} autoPlay loop muted />
        <div className="home-content">
          <h1>Welcome</h1>
          <p>pull up, pour up.</p>
          <Link to="/Bitters">
            <div className="button-style">
              <button className="btn btn1">Get Started</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
