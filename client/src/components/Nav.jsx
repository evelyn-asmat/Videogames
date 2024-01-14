import '../styles/components/nav.css'

import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Nav(props) {
    return (
        <div className="navbar">
            <NavLink to="/home" className="logo">
                <img src="/videogame.svg" alt="Videogame Logo" height="30px" /> VIDEOGAMES
            </NavLink>
            <div className="navbar-group">
                <SearchBar />
                <NavLink to="/form">
                    <button>New</button>
                </NavLink>
            </div>
            <NavLink to="/">
                <button>Exit</button>
            </NavLink>
        </div>
    );
}