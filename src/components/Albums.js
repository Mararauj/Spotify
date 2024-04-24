"use client"
import "../App.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Navbar } from './Navbar';
import Pagination from './PagiGAlbum'; 

export function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(25); 

  useEffect(() => {
    fetch('http://localhost:8000/albums')
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
    <Pagination 
        itemsPerPage={albumsPerPage}
        totalItems={albums.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div>
        <Navbar/>
      </div>
    <div className='grid-container'>
      {currentAlbums.map((album) => (
        <div className="grid-item">
          <div>
            <h4 className="App-link">{album.name}</h4>
            <Link key={album.id} to={"/album/" + album.id}>
              <img src={album.cover_small} alt={album.name} />
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
