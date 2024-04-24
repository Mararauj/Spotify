import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";

export function AlbumDetails() {
  const { albumid } = useParams();
  const [album, setalbum] = useState({});
  const [songs, setsongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actualSong, setActualSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/albums/" + albumid);
        const data = await response.json();
        setalbum(data.album);
        setsongs(data.tracks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [albumid]);

  const playSong = (song) => {
    if (actualSong === song) {
      setActualSong(null);
    } else {
      setActualSong(song);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <Navbar />
      <h1 className="">{album.name}</h1>
      <small className="text">{album.description}</small>
      <h2 className="">Tracks</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <div>
              <h4 className="App-link">{song.name}</h4>
              <p className="text">Track Number : {song.track_no}</p>
            </div>
            <button onClick={() => playSong(song)}>
              {actualSong === song ? "Pause" : "Play"}
            </button>
            {actualSong === song && (
              <audio controls>
                <source src={song.mp3} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
