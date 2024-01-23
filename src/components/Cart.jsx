// In cart.jsx
import React, { useEffect, useState } from "react";
import { getCart } from "../api/ajaxHelper";
import axios from "axios";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const userId = { username };

    const fetchCartData = async () => {
      try {
        const data = await getCart(userId);
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {/* Display cart items and accumulated price */}
    </div>
  );
};

export default Cart;
