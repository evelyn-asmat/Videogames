import '../styles/components/filters.css'

import { fetchVideogames, setFilters, setLoadingCards, showAlert } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { API_URL } from '../utils/constants';
import axios from 'axios';

export default function Filters(props) {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const isLoadingCards = useSelector(state => state.isLoadingCards);

    const [genres, setGenres] = useState([]);

    const getGenres = async () => {
        try {
            const { data } = await axios(`${API_URL}/genres/`);
            data ? setGenres(data) : dispatch(showAlert("Genres not found"));;
        } catch (error) {
            console.error(error.message);
            dispatch(showAlert("Oops, something has gone wrong."));
        }
    }

    const handleFilterChange = (event) => {
        dispatch(setLoadingCards(true));
        dispatch(setFilters({ ...filters, [event.target.name]: event.target.value }));
        dispatch(fetchVideogames({ ...filters, [event.target.name]: event.target.value }));
    };

    const handleClearFilters = (event) => {
        event.preventDefault();
        dispatch(setLoadingCards(true));
        dispatch(setFilters({
            ...filters,
            order: "",
            genre: "",
            origin: ""
        }));
        dispatch(fetchVideogames({
            ...filters,
            order: "",
            genre: "",
            origin: ""
        }));
    }

    useEffect(() => {
        getGenres();
        return () => {
            dispatch(setLoadingCards(true));
            dispatch(setFilters({
                name: "",
                order: "",
                genre: "",
                origin: ""
            }));
            dispatch(fetchVideogames({
                name: "",
                order: "",
                genre: "",
                origin: ""
            }));
        };
    }, []);

    return (
        <div className={`filters ${isLoadingCards ? 'hidden' : ''}`}>
            <div className="form-group">
                <label htmlFor="order">Sort by: </label>
                <select name="order" id="order" className="pixel-input" onChange={handleFilterChange} value={filters.order}>
                    <option value="">-----</option>
                    <option value="name-ASC">Name (A to Z)</option>
                    <option value="name-DESC">Name (Z to A)</option>
                    <option value="rating-DESC">Best rating first</option>
                    <option value="rating-ASC">Worst rating first</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre: </label>
                <select name="genre" id="genre" className="pixel-input" onChange={handleFilterChange} value={filters.genre}>
                    <option value="">All</option>
                    {genres && genres.length > 0 ? (
                        genres.map((genre) => {
                            return (
                                <option value={genre.name} key={genre.id}>{genre.name}</option>
                            )
                        })
                    ) : ""
                    }
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="origin">Source: </label>
                <select name="origin" id="origin" className="pixel-input" onChange={handleFilterChange} value={filters.origin}>
                    <option value="">All</option>
                    <option value="DB">Database</option>
                    <option value="API">API</option>
                </select>
            </div>
            <div className="form-group btn">
                <button onClick={handleClearFilters}>Clear filters</button>
            </div>
        </div>
    );
}