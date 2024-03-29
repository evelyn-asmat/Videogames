import './styles/elements/pixel.css'
import './styles/elements/animation.css'

import { Alert, Cards, Detail, Error, Form, Landing, Nav } from './components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchVideogames } from './redux/actions';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const videogames = useSelector(state => state.videogames);
  const filters = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchVideogames(filters, 1));
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
          ? <Nav />
          : null
      }

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Cards videogames={videogames} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <div className='noise'></div>
      <div className="animation-wrapper">
        <div className="particle particle-2"></div>
        <div className="particle particle-4"></div>
      </div>
      <Alert></Alert>
    </div>
  )
}

export default App
