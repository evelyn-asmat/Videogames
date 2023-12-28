import '../styles/components/detail.css'

import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const URL = "http://localhost:3001/videogames";

export default function Detail(props) {
   const {id} = useParams();
   const [videogame, setVideogame] = useState({});

    useEffect(() => {
        axios(`${URL}/${id}`).then(
        ({ data }) => {
            if (data.name) {
                setVideogame(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('detail-data').style.display = 'block';
        }
        ); 
        return setVideogame({});
    }, [id]);

    return (
        <div className="detail">
            <div id="spinner" className="fa-3x">
               <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
            <div id="detail-data">
                <h1>{videogame.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: videogame.description }} />
                <div className='platforms'>
                    {videogame.platforms &&
                        videogame.platforms.map((platform, index) => {
                            return (
                                <div className='pixel' key={index}><p>{platform}</p></div>
                            )
                        })
                    }
                </div>
                <img src={videogame.image} alt={videogame.name} />
                <p>{videogame.released}</p>
                <p>{videogame.rating}</p>
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
    );
}