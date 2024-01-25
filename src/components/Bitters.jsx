import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Bitters.css";

export default function Bitters({ token, userId }) {
  const [bitters, setBitters] = useState([]);
  const [searchBitters, setSearchBitters] = useState("");
  const [storedBitters, setStoredBitters] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = location.state || {};

  useEffect(() => {
    async function getBitters() {
      try {
        const allBitters = await fetchAllProducts();
        setBitters(allBitters);
        setStoredBitters(allBitters);

        const initialShowDescription = allBitters.reduce(
          (acc, product) => ({ ...acc, [product.id]: false }),
          {}
        );
        setShowDescription(initialShowDescription);
      } catch (err) {
        console.error(err);
      }
    }

    getBitters();
  }, []);

  const toggleDescription = (productId) => {
    setShowDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  //give user access to check out items once they have a token & add to cart
  /*Clone the existing cart items array, Update the state with the new cart items,
  Update the local storage with the new cart items*/
  const handleAddToCart = (product) => {
    if (token) {
      const updatedCartItems = [...cartItems, product];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      navigate("/account");
    }
  };

  console.log(token);

  return (
    <>
      <div className="page-container">
        {token ? (
          <div className="welcome-message">
            <h2>Welcome back, {username}!</h2>
          </div>
        ) : null}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Bitters"
            value={searchBitters}
            onChange={(e) => setSearchBitters(e.target.value.toLowerCase())}
          />
        </div>

        <div className="bitters-name">
          <h2>Our Bitters</h2>
        </div>
        <div className="bitters-container">
          {storedBitters
            .filter((product) =>
              product.name.toLowerCase().includes(searchBitters.toLowerCase())
            )
            .filter((product) => product.type === "bitters")
            .map((product) => (
              <div className="bitters-card" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.imgUrl} alt={product.name} />
                <button
                  className="btn btn1"
                  onClick={() => toggleDescription(product.id)}
                >
                  Details
                </button>
                {showDescription[product.id] && (
                  <>
                    <p>{product.description}</p>

                    <button
                      className="btn btn1"
                      onClick={() => handleAddToCart(product)}
                    >
                      {token ? "Add to Cart" : "Go to Account"}
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="bottom-center">
          <button className="btn btn1" onClick={() => navigate("/shrubs")}>
            Go to Shrubs
          </button>
        </div>
      </div>
    </>
  );
}
