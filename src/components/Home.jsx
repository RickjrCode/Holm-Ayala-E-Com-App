import React from "react";
import videoDrink from "../assets/drinks.mp4";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home-overlay"></div>
        <video src={videoDrink} autoPlay loop muted />
        <div className="home-content">
          <h1>Welcome</h1>
          <p>pull up, pour up.</p>
        </div>
      </div>
    </>
  );
}
