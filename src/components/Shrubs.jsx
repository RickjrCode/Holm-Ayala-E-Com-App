import React from "react";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate } from "react-router-dom";

export default function Shrubs() {
  const [shrubs, setShrubs] = useState([]);
  const [searchShrubs, setSearchShrubs] = useState("");
  const [storedShrubs, setStoredShrubs] = useState([]);
  const navigate = useNavigate();

  const filteredShrubs = storedShrubs
    .filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchShrubs.toLocaleLowerCase());
    })
    .filter((product) => product.type === "shrubs");

  async function getShrubs() {
    try {
      const allShrubs = await fetchAllProducts();
      setShrubs(allShrubs);
      setStoredShrubs(allShrubs);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getShrubs();
  }, []);
  return (
    <>
      <div className="page-container">
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
          {filteredShrubs.map((product) => (
            <div className="bitters-card" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imgUrl} alt={product.name} />
              <button
                className="btn btn1"
                onClick={() => navigate(`/account/${product.id}`)}
              >
                Details
              </button>
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
