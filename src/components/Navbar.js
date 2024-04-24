import { Link } from "react-router-dom";
import "../App.css"
 export function Navbar() {
  return (
    <nav className="navbar">
    <Link className="navbarcolor" to ="/">Home</Link>
    <br></br>
      <Link className="navbarcolor" to="/artist">Artists</Link>
      <br></br>
      <Link  className="navbarcolor" to="/genres">Genres</Link>
      <br></br>
      <Link className="navbarcolor" to="/albums">Albums</Link>
      <br></br>
      <Link className="navbarcolor" to="/search">Search</Link>
    </nav>
  );
}
