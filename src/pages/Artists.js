import '../App.css';
import { useState, useEffect } from 'react';
import Artists from '../components/Artists';
import Pagination from '../components/Pagination';
import {Navbar} from '../components/Navbar';

export function Artist() {
  const [artists, setArtists] = useState([]);
  const [pageActuelle, setPageActuelle] = useState(1);
  const [parPage] = useState(20);


  useEffect(() => {
    fetch('http://localhost:8000/artists')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[0]);
        setArtists(data);
      });
  }, []);

  const dernier = pageActuelle * parPage;
  const premier = dernier - parPage;
  const artistActuel = artists.slice(premier,dernier);

  const paginate = (numeroPage) => setPageActuelle(numeroPage);

  return (
    <div className='background'>
    <Navbar/>
      <h1>Tous les artistes</h1>
      <Artists artists={artistActuel} />
      <Pagination parPage={parPage} total={artists.length} paginate={paginate} />
    </div>
  );
}
