import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Genre() {
  const [genres, setgenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/genres")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setgenres(data);
      });
  }, []);

  return (
    <div className="background">
      <Navbar />
      <h1>All Genres</h1>
      {genres.map((genre) => (
        <div className="homegrid">
          <Link className="albumlink" to={"/genres/genrealbums/" + genre.id}>
            {genre.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
