import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Navbar} from './Navbar';
import "../App.css";
export function Home() {
  const [randomalb, setrandomalb] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((res) => res.json())
      .then((data) => {
        const randomSubset = getRandomSubset(data, 20);
        setrandomalb(randomSubset);
      });
  }, []);

  const getRandomSubset = (array, size) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  };
  return (
    <div className="background">
    <Navbar/>
      <h1>Welcome To Mellowfy</h1>
      <div>
      <div className="homegrid">
        {randomalb.map((album) => (
          <Link className="albumlink" key={album.id} to={"/album/" + album.id}>
            <div className="homegrid-items">
              <h4>{album.name} </h4>
              <img src={album.cover_small} alt={album.name} />
            </div>
            <br></br>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
