import '../styles/components/form.css'

import { useEffect, useState } from "react";

import { API_URL } from '../utils/constants';
import axios from 'axios';
import maxDate from "../utils/date";
import validation from "../utils/validation";

export default function Form(props) {
    const [genres, setGenres] = useState([]);
    const [videogameData, setVideogameData] = useState({
        name: "",
        description: "",
        platforms: [],
        image: "",
        released: "",
        rating: "",
        genres: []
    })
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genres: "",
    })

    const handleChange = (event) => {
        setVideogameData({ ...videogameData, [event.target.name]: event.target.value });
        setErrors(
            validation({
                ...videogameData,
                [event.target.name]: event.target.value
            })
        )
    };

    const handleGenresChange = (event) => {
        const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
        setVideogameData({ ...videogameData, genres: selectedGenres });
        setErrors(validation({ ...videogameData, genres: selectedGenres }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createVideogame();
    }

    const getGenres = async () => {
        try {
          const { data } = await axios(`${API_URL}/genres/`);
          data ? setGenres(data): alert("Genres not found.");
        } catch (error) {
          alert(error.message);
        }
    }

    const createVideogame = async () => {
        try {
          const { data } = await axios.post(`${API_URL}/videogames/`, videogameData);
          data.id ? navigate('/home'): alert("Error.");
        } catch (error) {
          alert(error.message);
        }
    }

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div className="form pixel-box">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="pixel-input"
                        value={videogameData.name}
                        onChange={handleChange}
                    />
                    <p className="form-error">{errors.name ? errors.name : null}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description*</label>
                    <textarea 
                        id="description"
                        name="description"
                        className="pixel-input"
                        cols="50" rows="5"
                        value={videogameData.description}
                        onChange={handleChange}
                    ></textarea>
                    <p className="form-error">{errors.description ? errors.description : null}</p>
                </div>
                
                <div className="form-group">
                    <label htmlFor="image">Image*</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="pixel-input"
                        accept=".jpg, .jpeg, .png, .svg, .gif"
                        value={videogameData.image}
                        onChange={handleChange}
                    />
                    <p className="form-error">{errors.image ? errors.image : null}</p>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="released">Released*</label>
                        <input
                            type="date"
                            max={maxDate()}
                            id="released"
                            name="released"
                            className="pixel-input"
                            value={videogameData.released}
                            onChange={handleChange}
                        />
                        <p className="form-error">{errors.released ? errors.released : null}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating*</label>
                        <input
                            type="range"
                            min="0" max="5" step="0.1"
                            id="rating"
                            name="rating"
                            className="pixel-input"
                            value={videogameData.rating}
                            onChange={handleChange}
                        />
                        <div className="rating-selected">{videogameData.rating}</div>
                        <p className="form-error">{errors.rating ? errors.rating : null}</p>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="platforms">Platforms*</label>
                    <textarea 
                        cols="50" rows="5"
                        id="platforms"
                        name="platforms"
                        className="pixel-input"
                        value={videogameData.platforms}
                        onChange={handleChange}
                    ></textarea>
                    <p className="form-error">{errors.platforms ? errors.platforms : null}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="genres">Genres*</label>
                    <select 
                        multiple
                        id="genres"
                        name="genres"
                        className="pixel-input"
                        value={videogameData.genres}
                        onChange={handleGenresChange}
                    >
                        {genres && genres.length > 0 ? (
                            genres.map((genre) => {
                                return (
                                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                                )
                            })
                        ) : ""
                        }
                    </select>
                    <p className="form-error">{errors.genres ? errors.genres : null}</p>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}