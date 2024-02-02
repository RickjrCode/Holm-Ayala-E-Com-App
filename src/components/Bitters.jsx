import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../userContext";
import "../Bitters.css";

export default function Bitters() {
  const { token, setToken, clearToken } = useUserContext();
  const [bitters, setBitters] = useState([]);
  const [searchBitters, setSearchBitters] = useState("");
  const [storedBitters, setStoredBitters] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [bittersCartItems, setBittersCartItems] = useState([]);
  const [addToCartCounts, setAddToCartCounts] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    async function getBitters() {
      try {
        const inToken = localStorage.getItem("token");
        setToken(inToken);

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
      const result = bittersCartItems.find((item) => item.id == product.id);
      console.log(result, updatedCounts);
      if (!result) {
        console.log("no result");
        const updatedCartItems = [
          ...bittersCartItems,
          { ...product, count: updatedCounts[product.id] || 1 },
        ];
        setBittersCartItems(updatedCartItems);

        localStorage.setItem(
          "bittersCartItems",
          JSON.stringify(updatedCartItems)
        );
      } else {
        const otherItems = bittersCartItems.filter(
          (bitter) => bitter.id != product.id
        );
        const updatedCartItems = [
          ...otherItems,
          { ...product, count: updatedCounts[product.id] },
        ];
        setBittersCartItems(updatedCartItems);
        localStorage.setItem(
          "bittersCartItems",
          JSON.stringify(updatedCartItems)
        );
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
            placeholder="Search our Bitters"
            value={searchBitters}
            onChange={(e) => setSearchBitters(e.target.value.toLowerCase())}
          />
        </div>
        {token ? (
          <button className="btn btn1" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : null}

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
          <button className="btn btn1" onClick={() => navigate("/shrubs")}>
            Go to Shrubs
          </button>
        </div>
      </div>
    </>
  );
}
