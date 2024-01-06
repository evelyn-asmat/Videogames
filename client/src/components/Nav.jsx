import '../styles/components/nav.css'

import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Nav(props) {
    return (
        <div className="navbar">
            <NavLink to="/" className="logo">
                <img src="/videogame.svg" alt="Videogame Logo" height="30px"/> VIDEOGAMES
            </NavLink>
            <SearchBar onSearch={props.onSearch} />
            <button>
                <NavLink to="/form">New</NavLink>
            </button>
        </div>
    );
}