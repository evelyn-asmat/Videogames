import './styles/elements/pixel.css'

import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cards from './components/Cards';
import Detail from './components/Detail';
import Error from './components/Error';
import Form from './components/Form';
import Landing from './components/Landing';
import Nav from './components/Nav';
import axios from 'axios';

const URL = "http://localhost:3001/videogames"

function App() {
  const location = useLocation();

  const [videogames, setVideogames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onSearch = async (name) => {
    if ( !name ){
      return getVideogames();
    }
    try {
      const response = await axios(`${URL}?name=${name}`);
      setVideogames(response.data);
      setTotalPages(Math.ceil(response.headers['total-videogames'] / 15));
    } catch (error) {
      alert(error.message);
    }
  }

  const getVideogames = async () => {
    try {
      const response = await axios(`${URL}?page=${currentPage}&limit=15`);
      setVideogames(response.data);
      setTotalPages(Math.ceil(response.headers['total-videogames'] / 15));
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    getVideogames();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          ? <Nav onSearch={onSearch} />
          : null
      }

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Cards videogames={videogames} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
