import { fetchVideogames, setFilters } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function SearchBar(props) {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    const handleChange = (event) => {
        dispatch(setFilters({...filters, "name": event.target.value}));
        if (!event.target.value) {
            dispatch(fetchVideogames({...filters, "name": event.target.value}));
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            dispatch(fetchVideogames(filters));
        } else if (event.key === 'Esc'){
            dispatch(setFilters({...filters, "name": ""}));
        }
    }
    
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(fetchVideogames(filters));
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