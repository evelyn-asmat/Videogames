import { fetchVideogames, setFilters } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom';

export default function SearchBar(props) {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const navigate = useNavigate();

    const handleChange = (event) => {
        dispatch(setFilters({ ...filters, "name": event.target.value }));
        if (!event.target.value) {
            dispatch(fetchVideogames({ ...filters, "name": event.target.value }));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(fetchVideogames(filters));
            navigate("/home");
        } else if (event.key === 'Esc') {
            dispatch(setFilters({ ...filters, "name": "" }));
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(fetchVideogames(filters));
        navigate("/home");
    }

    return (
        <div className="search-bar">
            <input
                type='search'
                className="pixel-input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={filters.name}
                placeholder="Name"
            />
            <button onClick={handleClick}>Search</button>
        </div>
    );
}