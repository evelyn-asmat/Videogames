import './App.css'
import './styles/main.css'

import { Route, Routes, useLocation } from 'react-router-dom';

import Cards from './components/Cards';
import Detail from './components/Detail';
import Error from './components/Error';
import Landing from './components/Landing';

function App() {
  const location = useLocation();
  return (
    <>
      <div className='App'>
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
    </>
  )
}

export default App
