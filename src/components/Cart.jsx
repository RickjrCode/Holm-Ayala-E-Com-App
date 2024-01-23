import React, { useEffect, useState } from "react";
import { getCart } from "../api/ajaxHelper";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const userId = "user123";

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

  const total = cartData.reduce((acc, product) => acc + product.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cartData.length === 0 ? (
        <>
          <p>Cart is empty</p>
          <div>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
            <span> or </span>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {cartData.map((product) => (
            <div key={product.id}>
              <p>{product.imgUrl}</p>
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          ))}
          <p>Total Price: {total}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
