import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Pagination from "./PagiGAlbum.js"; 
import "../App.css";

export function GenreAlbums() {
  const { genreid } = useParams();
  const [genre, setGenre] = useState({});
  const [albumDetails, setAlbumDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/genres/" + genreid);
        const data = await response.json();
        setGenre(data.genre);

        const albumdetailsPromises = data.albums.map(async (albumid) => {
          const response = await fetch(
            "http://localhost:8000/albums/" + albumid
          );
          const data = await response.json();
          return data.album;
        });
        const albumdetails = await Promise.all(albumdetailsPromises);
        setAlbumDetails(albumdetails);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [genreid]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = albumDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <Navbar />
      <h1>{genre.name}</h1>
      <h2>Albums</h2>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={albumDetails.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <ul>
        {currentItems.map((album) => (
          <li key={album.id}>
            <img src={album.cover_small} alt={album.name} />
            <div>
              <Link className="App-link" to={"/album/" + album.id}>{album.name}</Link>
              <p className="text">{album.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
