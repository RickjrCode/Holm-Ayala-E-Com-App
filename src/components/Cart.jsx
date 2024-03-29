import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import cartAnimation from "../assets/cartAnime.json";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [bittersCartItems, setBittersCartItems] = useState([]);
  const [shrubsCartItems, setShrubsCartItems] = useState([]);
  const [bittersTotal, setBittersTotal] = useState(0);
  const [shrubsTotal, setShrubsTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  //separated the useEffects to remove infinite loop
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

  useEffect(() => {
    // Calculate bitters total
    const bittersTotal = bittersCartItems.reduce(
      (acc, product) => acc + product.price,
      0
    );
    setBittersTotal(bittersTotal);

    // Calculate shrubs total
    const shrubsTotal = shrubsCartItems.reduce(
      (acc, product) => acc + product.price,
      0
    );
    setShrubsTotal(shrubsTotal);

    // Calculate total amount
    setTotalAmount(bittersTotal + shrubsTotal);
  }, [bittersCartItems, shrubsCartItems]);

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
  console.log(bittersCartItems);
  return (
    <div className="cart-container">
      {bittersCartItems.length === 0 && shrubsCartItems.length === 0 ? (
        <>
          <h2>Wow! Your cart is so empty.</h2>
          <Lottie
            loop={true}
            animationData={cartAnimation}
            style={{ width: "40%", height: "80%", margin: "auto" }}
          />
        </>
      ) : (
        <>
          <div className="cart-header">
            <h2>Your Cart</h2>
          </div>
          <div className="total-container">
            <h3>Total Price: ${totalAmount.toFixed(2)}</h3>
          </div>

          <div className="bitters-container">
            <h3>Bitters</h3>
            {bittersCartItems.length === 0 ? (
              <p>No bitters in your cart</p>
            ) : (
              bittersCartItems.map((product) => (
                <div className="bitters-card" key={product.id}>
                  <h3>{product.name}</h3>
                  <h3>QTY:{product.count}</h3>
                  <img src={product.imgUrl} alt={product.name} />
                  <p>${product.price}.00</p>
                  <button onClick={() => removeFromBittersCart(product.id)}>
                    Remove
                  </button>
                </div>
              ))
            )}
            <p> ${bittersTotal.toFixed(2)}</p>
          </div>

          <div className="bitters-container">
            <h3>Shrubs</h3>
            {shrubsCartItems.length === 0 ? (
              <p>No shrubs in your cart</p>
            ) : (
              shrubsCartItems.map((product) => (
                <div className="bitters-card" key={product.id}>
                  <h3>{product.name}</h3>
                  <h3>QTY:{product.count}</h3>
                  <img src={product.imgUrl} alt={product.name} />
                  <p>${product.price}.00</p>
                  <button onClick={() => removeFromShrubsCart(product.id)}>
                    Remove
                  </button>
                </div>
              ))
            )}
            <p> ${shrubsTotal.toFixed(2)}</p>
          </div>

          <div className="bottom-center">
            {(bittersCartItems.length > 0 || shrubsCartItems.length > 0) && (
              <Link
                to="/checkout"
                state={{ totalAmount }}
                className="checkout-button"
              >
                Checkout
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
