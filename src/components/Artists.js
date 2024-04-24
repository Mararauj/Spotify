import { Link } from "react-router-dom";
import "../App.css";
function Artists({artists}) {
    
    return (
      <div>
        {artists.map((artist) => (
          <h3 key={artist.id}>
            <Link className="App-link" to={"/artist/artistpage/"+artist.id}>{artist.name}</Link>
          </h3>
        ))}
      </div>
    );
  }
  
  export default Artists;