import '../styles/components/form.css'

import { useState } from "react";
import validation from "../utils/validation";

export default function Form(props) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        createVideogame();
    }

    const createVideogame = async () => {
        
    }

    return (
        <div className="form pixel-box">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={videogameData.name}
                        onChange={handleChange}
                        className="pixel-input"
                    />
                    <p className="form-error">{errors.name ? errors.name : null}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description*</label>
                    <textarea 
                        name="description"
                        cols="50" rows="5"
                        value={videogameData.description}
                        onChange={handleChange}
                        className="pixel-input"
                    ></textarea>
                    <p className="form-error">{errors.description ? errors.description : null}</p>
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Image*</label>
                    <input
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png, .svg, .gif"
                        value={videogameData.image}
                        onChange={handleChange}
                        className="pixel-input"
                    />
                    <p className="form-error">{errors.image ? errors.image : null}</p>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="released">Released*</label>
                        <input
                            type="date"
                            name="released"
                            value={videogameData.released}
                            onChange={handleChange}
                            className="pixel-input"
                        />
                        <p className="form-error">{errors.released ? errors.released : null}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating*</label>
                        <input
                            type="range"
                            min="0" max="5" step="0.1"
                            name="rating"
                            value={videogameData.rating}
                            onChange={handleChange}
                            className="pixel-input"
                        />
                        <div className="rating-selected">{videogameData.rating}</div>
                        <p className="form-error">{errors.rating ? errors.rating : null}</p>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="platforms">Platforms*</label>
                    <textarea 
                        name="platforms"
                        cols="50" rows="5"
                        value={videogameData.platforms}
                        onChange={handleChange}
                        className="pixel-input"
                    ></textarea>
                    <p className="form-error">{errors.platforms ? errors.platforms : null}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="genres">Genres*</label>
                    <select name="genres" multiple value={videogameData.genres} onChange={handleChange} className="pixel-input">
                        <option value="1">Op1</option>
                        <option value="2">Op2</option>
                    </select>
                    <p className="form-error">{errors.genres ? errors.genres : null}</p>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}