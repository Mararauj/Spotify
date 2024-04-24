"use client";
import "../App.css";
import { Navbar } from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/artists")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setArtists(data);
      });
  }, []);

  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setAlbums(data);
      });
  }, []);

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/genres")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setGenres(data);
      });
  }, []);

  return (
    <div className="searchbutton">
      <input
        type="text"
        placeholder="Search ..."
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
      <div className="background">
        <Navbar />
        <h3>Filter by Artists</h3>
        {artists
          .filter((artist) => {
            if (searchInput === "") {
              return artist;
            } else if (
              artist.name.toLowerCase().startsWith(searchInput.toLowerCase())
            ) {
              return artist;
            }
          })
          .map((artist) => (
            <div>
              <Link className="App-link" to={"/artist/artistpage/" + artist.id}> {artist.name}</Link>
            </div>
          ))}
      </div>

      <div  className="background">
        <h3>Filter by Albums</h3>
        {albums
          .filter((album) => {
            if (searchInput === "") {
              return album;
            } else if (
              album.name.toLowerCase().startsWith(searchInput.toLowerCase())
            ) {
              return album;
            }
          })
          .map((album) => (
            <div>
              <Link className="App-link" to={"/genres/genrealbums/" + album.id}> {album.name}</Link>
            </div>
          ))}
      </div>

      <div  className="background">
        <h3>Filter by Genres</h3>
        {genres
          .filter((genre) => {
            if (searchInput === "") {
              return genre;
            } else if (
              genre.name.toLowerCase().startsWith(searchInput.toLowerCase())
            ) {
              return genre;
            }
          })
          .map((genre) => (
            <div key={genre.id}>
              <Link className="App-link" to={"/genres/genrealbums/" + genre.id}>{genre.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
}
