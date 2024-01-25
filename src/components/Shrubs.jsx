import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Bitters.css";

export default function Shrubs({ token, userId }) {
  const [shrubs, setShrubs] = useState([]);
  const [searchShrubs, setSearchShrubs] = useState("");
  const [storedShrubs, setStoredShrubs] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const Location = useLocation();
  const navigate = useNavigate();

  const { username } = Location.state || {};

  useEffect(() => {
    const filteredShrubs = storedShrubs.filter((product) => {
      return product.name.toLowerCase().includes(searchShrubs.toLowerCase());
    });

    async function getShrubs() {
      try {
        const allShrubs = await fetchAllProducts();
        setShrubs(allShrubs);
        setStoredShrubs(allShrubs);

        const initialShowDescription = allShrubs.reduce(
          (acc, product) => ({ ...acc, [product.id]: false }),
          {}
        );
        setShowDescription(initialShowDescription);
      } catch (err) {
        console.error(err);
      }
    }

    getShrubs();
  }, []);

  const toggleDescription = (productId) => {
    setShowDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // const handleCheckOut = () => {
  //   if (token) {
  //     console.log("Perform check out action");
  //   } else {
  //     navigate("/account");
  //   }
  // };

  const handleAddToCart = (product) => {
    if (token) {
      const updatedCartItems = [...cartItems, product];
      setCartItems(updatedCartItems);
      LocalStorage.setItems("cartItems", JSON.stringify(updatedCartItems));
    } else {
      navigate("/account");
    }
  };
  return (
    <>
      <div className="page-container">
        {token ? (
          <div className="welcome-message">
            <h2>Welcome back, {username} !</h2>{" "}
          </div>
        ) : null}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Shrubs"
            value={searchShrubs}
            onChange={(e) => {
              setSearchShrubs(e.target.value.toLowerCase());
            }}
          />
        </div>

        <div className="bitters-name">
          <h2>Our Shrubs</h2>
        </div>
        <div className="bitters-container">
          {storedShrubs
            .filter((product) => product.type === "shrubs")
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
          <button className="btn btn1" onClick={() => navigate("/bitters")}>
            Go to Bitters
          </button>
        </div>
      </div>
    </>
  );
}
