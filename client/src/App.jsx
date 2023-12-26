import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cards from './components/Cards';
import Detail from './components/Detail';
import Error from './components/Error';
import Landing from './components/Landing';
import Nav from './components/Nav';
import axios from 'axios';

function App() {
  const location = useLocation();

  const [videogames, setVideogames] = useState([]);

  const getVideogames = async () => {
    try {
      const { data } = await axios("http://localhost:3001/videogames");
      setVideogames(data);
    } catch (err) {
      alert(err.message);
    }
      
  }

  useEffect(() => {
    getVideogames();
  }, []);

  return (
    <div className=
    {
      (location.pathname === "/")
      ? 'landing'
      : 'app'
    }
    >
      {
        (location.pathname !== "/")
        ? <Nav/>
        : null
      }
      
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Cards videogames={videogames}/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  )
}

export default App
