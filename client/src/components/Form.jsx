import '../styles/components/form.css'

import { fetchVideogames, showAlert } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { API_URL } from '../utils/constants';
import axios from 'axios';
import maxDate from "../utils/date";
import { useNavigate } from "react-router-dom";
import validation from "../utils/validation";

export default function Form(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(state => state.filters);
    const [genres, setGenres] = useState([]);
    const [platforms, setPlaforms] = useState([]);
    const [videogameData, setVideogameData] = useState({
        name: "",
        description: "",
        platforms: [],
        image: "",
        released: "",
        rating: "",
        genres: []
    })
    const [errors, setErrors] = useState({})

    const [disabledSubmit, setDisabledSubmit] = useState("disabled");

    const handleChange = async (event) => {
        if (event.target.name === "image") {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            if (selectedFile) reader.readAsDataURL(selectedFile);

            reader.onload = () => {
                setVideogameData({ ...videogameData, image: reader.result });
            }
        }
        setVideogameData({ ...videogameData, [event.target.name]: event.target.value });
        setErrors(
            validation({
                ...videogameData,
                [event.target.name]: event.target.value
            })
        )
    };

    const handlePlatformsChange = (event) => {
        const selectedPlatforms = Array.from(event.target.selectedOptions, (option) => option.value);
        setVideogameData({ ...videogameData, platforms: selectedPlatforms });
        setErrors(validation({ ...videogameData, platforms: selectedPlatforms }));
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

    const getPlatforms = async () => {
        try {
            const { data } = await axios(`${API_URL}/platforms/`);
            data ? setPlaforms(data) : dispatch(showAlert("Platforms not found."));;
        } catch (error) {
            console.error(error.message);
            dispatch(showAlert("Oops, something has gone wrong."));
        }
    }

    const getGenres = async () => {
        try {
            const { data } = await axios(`${API_URL}/genres/`);
            data ? setGenres(data) : dispatch(showAlert("Genres not found."));;
        } catch (error) {
            console.error(error.message);
            dispatch(showAlert("Oops, something has gone wrong."));
        }
    }

    const createVideogame = async () => {
        try {
            const { data } = await axios.post(`${API_URL}/videogames/`, videogameData);
            if (data.id) {
                dispatch(fetchVideogames(filters, 1));
                dispatch(showAlert("Videogame created."));
                navigate('/home');
            } else {
                dispatch(showAlert("Oops, something has gone wrong."));
            }
        } catch (error) {
            console.error(error.message);
            dispatch(showAlert("Oops, something has gone wrong."));
        }
    }

    useEffect(() => {
        getPlatforms();
        getGenres();
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && Object.values(videogameData).every(value => value !== "")) {
            setDisabledSubmit(false);
        } else {
            setDisabledSubmit("disabled");
        }
    }, [errors])

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
                    <div className="form-image-container">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="pixel-input"
                            accept=".jpg, .jpeg, .png, .svg, .gif"
                            onChange={handleChange}
                        />
                        {videogameData.image && <img src={videogameData.image} alt="Uploaded image" className='image-preview' />}
                    </div>
                    <p className="form-error">{errors.image ? errors.image : null}</p>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="released">Released*</label>
                        <input
                            type="date"
                            max={maxDate()}
                            min="1950-01-01"
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
                        <div className="input-selected">{videogameData.rating}</div>
                        <p className="form-error">{errors.rating ? errors.rating : null}</p>
                    </div>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="platforms">Platforms*</label>
                        <select
                            multiple="multiple"
                            size={Math.max(platforms.length, genres.length)}
                            id="platforms"
                            name="platforms"
                            className="pixel-input"
                            value={videogameData.platforms}
                            onChange={handlePlatformsChange}
                        >
                            {platforms && platforms.length > 0 ? (
                                platforms.map((platform) => {
                                    return (
                                        <option value={platform.name} key={platform.id}>{platform.name}</option>
                                    )
                                })
                            ) : ""
                            }
                        </select>
                        <p className="form-error">{errors.platforms ? errors.platforms : null}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="genres">Genres*</label>
                        <select
                            multiple="multiple"
                            size={Math.max(platforms.length, genres.length)}
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
                </div>

                <button disabled={disabledSubmit}>Submit</button>
            </form>
        </div>
    );
}