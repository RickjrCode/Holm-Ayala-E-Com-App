import React from "react";
import drinkLogo from "../assets/bitters-drink.png";

const Checkout = (props) => {
  const totalAmount = props.location?.state?.totalAmount ?? 0;
  const formattedTotalAmount = totalAmount ? totalAmount.toFixed(2) : 0.0;

  return (
    <div className="checkout-container">
      <img id="logo-img" src={drinkLogo} alt="Drink Logo" />
      <h2 style={{ textAlign: "center" }}>Thank you for your purchase!</h2>
    </div>
  );
};

export default Checkout;
