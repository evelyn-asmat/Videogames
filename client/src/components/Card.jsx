import '../styles/components/card.css'

import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <div className="card pixel-border">
            <div className='main'>
                <Link to={`/detail/${props.id}`}>
                    <img className='card-image' src={props.image} alt={props.name} />
                </Link>
                <Link to={`/detail/${props.id}`}>
                    <h1>{props.name}</h1>
                </Link>
                <div className='genres'>
                    {props.genres &&
                        props.genres.map((genre, index) => {
                            return (
                                <div className='pixel-label label2' key={index}>
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