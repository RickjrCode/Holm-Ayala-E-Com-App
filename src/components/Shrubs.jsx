import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../userContext";
import "../Bitters.css";

export default function Shrubs() {
  const { token, setToken, clearToken } = useUserContext();
  const [shrubs, setShrubs] = useState([]);
  const [searchShrubs, setSearchShrubs] = useState("");
  const [storedShrubs, setStoredShrubs] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [shrubsCartItems, setShrubsCartItems] = useState([]);
  const [addToCartCounts, setAddToCartCounts] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    async function getShrubs() {
      try {
        const inToken = localStorage.getItem("token");
        setToken(inToken);

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
  }, [setToken]);

  const toggleDescription = (productId) => {
    setShowDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (product) => {
    if (token) {
      const updatedCounts = {
        ...addToCartCounts,
        [product.id]: (addToCartCounts[product.id] || 0) + 1,
      };
      setAddToCartCounts(updatedCounts);
      const result = shrubsCartItems.find((item) => item.id == product.id);
      console.log(result, updatedCounts);
      if (!result) {
        console.log("no result");
        const updatedCartItems = [
          ...shrubsCartItems,
          { ...product, count: updatedCounts[product.id] || 1 },
        ];
        setShrubsCartItems(updatedCartItems);

        localStorage.setItem(
          "shrubsCartItems",
          JSON.stringify(updatedCartItems)
        );
      } else {
        const otherItems = shrubsCartItems.filter(
          (shrubs) => shrubs.id != product.id
        );
        const updatedCartItems = [
          ...otherItems,
          { ...product, count: updatedCounts[product.id] },
        ];
        setShrubsCartItems(updatedCartItems);
        localStorage.setItem("shrubsCartItem", JSON.stringify(updatedCounts));
      }
    } else {
      navigate("/account");
    }
  };

  const handleSignOut = () => {
    clearToken();
    navigate("/");
  };

  return (
    <>
      <div className="page-container">
        {token ? (
          <div className="welcome-message">
            <h2>Welcome {username}</h2>
          </div>
        ) : null}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Shrubs"
            value={searchShrubs}
            onChange={(e) => setSearchShrubs(e.target.value.toLowerCase())}
          />
        </div>
        {token ? (
          <button className="btn btn1" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : null}

        <div className="bitters-name">
          <h2>Our Shrubs</h2>
        </div>
        <div className="bitters-container">
          {storedShrubs
            .filter((product) =>
              product.name.toLowerCase().includes(searchShrubs.toLowerCase())
            )
            .filter((product) => product.type === "shrubs")
            .map((product) => (
              <div className="bitters-card" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.imgUrl} alt={product.name} />
                <h3>${product.price}.00</h3>
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
                      {token
                        ? `Add to Cart (${addToCartCounts[product.id] || 0})`
                        : "Go to Account"}
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
