import { Route, Routes, useLocation } from 'react-router-dom';

import Cards from './components/Cards';
import Detail from './components/Detail';
import Error from './components/Error';
import Landing from './components/Landing';
import Nav from './components/Nav';

function App() {
  const location = useLocation();

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
        <Route path="/home" element={<Cards/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  )
}

export default App
