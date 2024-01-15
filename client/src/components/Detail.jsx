import '../styles/components/detail.css'

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_URL } from '../utils/constants';
import { Loading } from '../components';
import axios from "axios";
import { showAlert } from '../redux/actions';
import { useDispatch } from 'react-redux';

export default function Detail(props) {
    const { id } = useParams();

    const [videogame, setVideogame] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        try {
            axios(`${API_URL}/videogames/${id}`).then(
                ({ data }) => {
                    if (data.name) {
                        setVideogame(data);
                        setIsLoading(false);
                    }
                }
            );
        } catch {
            setNotFound(true);
        }
    }, [id]);

    return (
        <div className="detail">
            <Loading isLoading={isLoading}></Loading>
            <div className={notFound ? '': 'hidden'}>
                <h2 className="game-over">GAME<br />OVER</h2>
                <p>Videogame not found.</p>
            </div>
            <div className={`pixel-box ${isLoading || notFound ? 'hidden' : ''}`}>
                <div className="detail-row">
                    <div className="detail-col">
                        <div className="detail-genres">
                            {videogame.genres &&
                                videogame.genres.map((genre, index) => {
                                    return (
                                        <div className="pixel-label label2" key={index}>
                                            <p>{genre.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr />
                        <h1>{videogame.name}</h1>
                        <hr />
                        <div className="detail-platforms">
                            {videogame.platforms &&
                                videogame.platforms.map((platform, index) => {
                                    return (
                                        <div className="pixel-label label1" key={index}>
                                            <p>{platform}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="detail-col">
                        <img src={videogame.image} alt={videogame.name} />
                    </div>
                </div>
                <div className="detail-row">
                    <p>
                        <img className="icon" src="/icons/released.png" alt='Released' />
                        RELEASED: {videogame.released}
                    </p>
                    <p>
                        <img className="icon" src="/icons/pixel-star.png" alt="star-icon" />
                        RATING: {videogame.rating}
                    </p>
                </div>
                <div className="detail-row">
                    {
                        isNaN(videogame.id)
                            ? <p className="detail-description">{videogame.description}</p>
                            : <div className="detail-description" dangerouslySetInnerHTML={{ __html: videogame.description }} />
                    }
                </div>
                <div className="detail-row">
                    <small>SOURCE: {isNaN(videogame.id) ? "DB" : "API"}</small>
                </div>
                <Link to="/home">
                    <button className={isLoading ? 'hidden' : ''}>Back to Videogames</button>
                </Link>
            </div>
        </div>
    );
}