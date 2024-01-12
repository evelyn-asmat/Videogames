import '../styles/components/filters.css'

import { fetchVideogames, setFilters } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { API_URL } from '../utils/constants';
import axios from 'axios';

export default function Filters(props) {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    const [genres, setGenres] = useState([]);

    const getGenres = async () => {
        try {
            const { data } = await axios(`${API_URL}/genres/`);
            data ? setGenres(data) : alert("Genres not found.");
        } catch (error) {
            alert(error.message);
        }
    }

    const handleFilterChange = (event) => {
        dispatch(setFilters({...filters, [event.target.name]: event.target.value}));
    };

    const applyFilters = () => {
        dispatch(fetchVideogames(filters));
    }

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <aside className="filters">
            <div className="form-group">
                <label htmlFor="order">Sort by: </label>
                <select name="order" id="order" className="pixel-input" onChange={handleFilterChange} value={filters.order} onBlur={applyFilters}>
                    <option value="">-----</option>
                    <option value="name-ASC">Name (A to Z)</option>
                    <option value="name-DESC">Name (Z to A)</option>
                    <option value="rating-DESC">Best rating first</option>
                    <option value="rating-ASC">Worst rating first</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre: </label>
                <select name="genre" id="genre" className="pixel-input" onChange={handleFilterChange} value={filters.orderGenre} onBlur={applyFilters}>
                    <option value="">All</option>
                    {genres && genres.length > 0 ? (
                        genres.map((genre) => {
                            return (
                                <option value={genre.id} key={genre.id}>{genre.name}</option>
                            )
                        })
                    ) : ""
                    }
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="origin">Origin: </label>
                <select name="origin" id="origin" className="pixel-input" onChange={handleFilterChange} value={filters.orderOrigin} onBlur={applyFilters}>
                    <option value="">All</option>
                    <option value="DB">Database</option>
                    <option value="API">API</option>
                </select>
            </div>
        </aside>
    );
}