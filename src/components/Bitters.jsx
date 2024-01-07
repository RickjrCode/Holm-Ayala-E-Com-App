import React from "react";
import { fetchAllBitters } from "../api/ajaxHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bitters() {
  const [bitters, setBitters] = useState([]);
  const [searchBitters, setSearchBitters] = useState("");
  const [storedBitters, setStoredBitters] = useState([]);
  const navigate = useNavigate();

  const filteredBitters = storedBitters.filter((bitters) => {
    return bitters.name
      .toLowerCase()
      .includes(searchBitters.toLocaleLowerCase());
  });

  async function getBitters() {
    try {
      const allBitters = await fetchAllBitters();
      setBitters(allBitters);
      //   setStoredBitters(allBitters);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBitters();
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Bitters"
            value={searchBitters}
            onChange={(e) => {
              setSearchBitters(e.target.value.toLowerCase());
            }}
          />
        </div>

        <div className="bitters-name">
          <h2>Our Bitters</h2>
        </div>
        <div className="bitters-container">
          {filteredBitters.map((bitters) => (
            <div className="bitters-card">
              key={bitters.json}
              <h3>{bitters.name}</h3>
              <img src={bitters.imageUrl} alt={bitters.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
