import React from "react";

const Checkout = (props) => {
  const totalAmount = props.location?.state?.totalAmount ?? 0;
  const formattedTotalAmount = totalAmount ? totalAmount.toFixed(2) : 0.0;

  return (
    <div className="checkout-container">
      <h2>Thank you for your purchase!</h2>
    </div>
  );
};

export default Checkout;
