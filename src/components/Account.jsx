import React from "react";
import drinkMoreVid from "../assets/more-drinks.mp4";

export default function Account() {
  return (
    <>
      <div className="account">
        <div className="account-overlay">
          <video src={drinkMoreVid} autoPlay loop muted />
        </div>
      </div>
    </>
  );
}
