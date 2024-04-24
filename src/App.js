import './App.css';
import{Routes,Route} from 'react-router-dom';
import {Home} from './components/Home';
import {Genre} from './components/Genre';
import {Search} from './components/Search';
import {Albums} from './components/Albums';
import { AlbumDetails } from './components/AlbumDetails';
import{GenreAlbums} from './components/GenreAlbums';
import {Artist} from './pages/Artists';
import { ArtistPage } from './components/ArtistPage';

function App() {
  return <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/genres" element={<Genre/>}/>
  <Route path="/genres/genrealbums/:genreid" element={<GenreAlbums />} />
  <Route path="/artist" element={<Artist/>} />
  <Route path="/artist/artistpage/:artistid" element={<ArtistPage/>}/>
  <Route path="/albums" element={<Albums />}/>
  <Route path="/search" element={<Search />}/>
  <Route path="/album/:albumid" element={<AlbumDetails/>}/>
  </Routes>
}

export default App;
