import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../App.css";

export function ArtistPage() {
  const { artistid } = useParams();
  const [albums, setalbums] = useState({});
  const [artist, setartist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/artists/" + artistid
        );
        const data = await response.json();
        setartist(data);
        const albumfetch = await fetch(
          "http://localhost:8000/albums/artist/" + artistid
        );
        const albumdata = await albumfetch.json();
        setalbums(albumdata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [artistid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <Navbar />
      <h1 className="App-link">{artist.name}</h1>
      <small className="text">{artist.description}</small>
      <div>
        <h2>Bio</h2>
        <p className="text">{artist.bio}</p>
        <img src={artist.photo} alt={artist.name} />
      </div>
      <h2>Albums</h2>
      <ul>
         {albums.map((album) => (
          <li key={album.id}>
            <div>
              <h4 className="App-link">{album.name}</h4>
              <Link to={"/album/"+album.id}><img src={album.cover_small} alt={album.name}/></Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
