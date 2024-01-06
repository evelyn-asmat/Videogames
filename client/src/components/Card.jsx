import '../styles/components/card.css'

import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <div className="card pixel-border">
            <div className='main'>
                <Link to={`/detail/${props.id}`}>
                    <img className='card-image' src={props.image} alt={props.name}/>
                </Link>
                <Link to={`/detail/${props.id}`}>
                    <h1>{props.name}</h1>
                </Link>
                <div className='platforms'>
                    {props.platforms &&
                        props.platforms.map((platform, index) => {
                            return (
                                <div className='pixel-label' key={index}><p>{platform}</p></div>
                            )
                        })
                    }
                </div>
                <div className='card-info'>
                    <div className="released">
                        <img src="https://cdn-icons-png.flaticon.com/512/9965/9965934.png" width="24" alt="Released"/>
                        {/* <img src="https://img.icons8.com/water-color/18/ff2a6d/pixel-heart.png" alt="calendar-icon"/> */}
                        <p>{props.released}</p>
                    </div>
                    <div className="rating">
                        <img width="18" src="https://img.icons8.com/ios/15/fcc419/pixel-star.png" alt="star-icon"/>
                        <p>{props.rating}</p>
                    </div>
                </div>
                <hr />
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