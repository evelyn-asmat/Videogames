import '../styles/components/detail.css'

import { useEffect, useState } from "react";

import { API_URL } from '../utils/constants';
import Loading from './Loading';
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Detail(props) {
    const { id } = useParams();
    const [videogame, setVideogame] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios(`${API_URL}/videogames/${id}`).then(
            ({ data }) => {
                if (data.name) {
                    setVideogame(data);
                } else {
                    window.alert('No videogames found');
                }
                setIsLoading(false);
            }
        );
    }, [id]);

    return (
        <div className="detail">
            <h1>{videogame.name}</h1>
            <p>{videogame.released}</p>
            <p>{videogame.rating}</p>
            <Loading isLoading={isLoading}></Loading>
            <div id="detail-data">
                <div id="wrap-image">
                    <img src={videogame.image} alt={videogame.name} />
                </div>
                <div>
                    <div className='platforms'>
                        {videogame.platforms &&
                            videogame.platforms.map((platform, index) => {
                                return (
                                    <div className='pixel' key={index}><p>{platform}</p></div>
                                )
                            })
                        }
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: videogame.description }} />
                    <div className='genres'>
                        {videogame.genres &&
                            videogame.genres.map((genre, index) => {
                                return (
                                    <div className='pixel label2' key={index}>
                                        <p>{genre.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}