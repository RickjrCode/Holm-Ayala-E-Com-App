import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [bittersCartItems, setBittersCartItems] = useState([]);
  const [shrubsCartItems, setShrubsCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Get bitters cart items from local storage
    const storedBittersCartItems = localStorage.getItem("bittersCartItems");
    if (storedBittersCartItems) {
      setBittersCartItems(JSON.parse(storedBittersCartItems));
    }

    // Get shrubs cart items from local storage
    const storedShrubsCartItems = localStorage.getItem("shrubsCartItems");
    if (storedShrubsCartItems) {
      setShrubsCartItems(JSON.parse(storedShrubsCartItems));
    }
  }, []);

  const removeFromBittersCart = (productId) => {
    const updatedCartItems = bittersCartItems.filter(
      (item) => item.id !== productId
    );
    setBittersCartItems(updatedCartItems);
    localStorage.setItem("bittersCartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromShrubsCart = (productId) => {
    const updatedCartItems = shrubsCartItems.filter(
      (item) => item.id !== productId
    );
    setShrubsCartItems(updatedCartItems);
    localStorage.setItem("shrubsCartItems", JSON.stringify(updatedCartItems));
  };

  const bittersTotal = bittersCartItems.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const shrubsTotal = shrubsCartItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  // Calculate total price for all products
  const total = bittersTotal + shrubsTotal;

  return (
    <>
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>
      <div className="total-container">
        <h3>Total Price: ${total.toFixed(2)}</h3>
      </div>

      <div className="bitters-container">
        <h3>Bitters</h3>
        {bittersCartItems.length === 0 ? (
          <p>No bitters in your cart</p>
        ) : (
          bittersCartItems.map((product) => (
            <div className="bitters-card" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imgUrl} alt={product.name} />
              <p>{product.price}</p>
              <button onClick={() => removeFromBittersCart(product.id)}>
                Remove
              </button>
            </div>
          ))
        )}
        <p>Total Price (Bitters): ${bittersTotal.toFixed(2)}</p>
      </div>

      <div className="bitters-container">
        <h3>Shrubs</h3>
        {shrubsCartItems.length === 0 ? (
          <p>No shrubs in your cart</p>
        ) : (
          shrubsCartItems.map((product) => (
            <div className="bitters-card" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imgUrl} alt={product.name} />
              <p>{product.price}</p>
              <button onClick={() => removeFromShrubsCart(product.id)}>
                Remove
              </button>
            </div>
          ))
        )}
        <p>Total Price (Shrubs): ${shrubsTotal.toFixed(2)}</p>
      </div>

      <div className="checkout-button-container">
        {bittersCartItems.length > 0 || shrubsCartItems.length > 0 ? (
          <Link to="/checkout" state={{ totalAmount }} className="btn btn1">
            Checkout
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
