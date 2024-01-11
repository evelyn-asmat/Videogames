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
                {/* <div className='platforms'>
                    {props.platforms &&
                        props.platforms.map((platform, index) => {
                            return (
                                <div className='pixel-label' key={index}><p>{platform}</p></div>
                            )
                        })
                    }
                </div> */}
                {/* <div className='card-info'>
                    <div className="released">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMUlEQVR4nM2Tr1LDQBDGIxEIJKKij4BEMFNcvo2BR+gjIDrdAxMeoAKJqEAieIgIRN1uZ+qJQCB4BGZg9vLvmEmTFiK6M79J5rL5bvfbuyg6hJivMWKJx8Z8jdG/BVmRO6VvgxV5V+KrJYSEFfjKirVzq84pZn2COQstWeJphVN6ZMWF4d8lnqabybHPt5wuQSdYsMJZ4myTnDabVBvQZ7iZ5TrBotOfUjS/Fbr2xivem2rxFdrRKxYGK2W18U1F29vrC2vZGy94cYIbgwXP0RDBSk/GIGKDCTrBg/noEXyU+JbtWXyD20mMhe73JZWrk1ogfZscscSXNUrZnSRnrYNSyqoz6jQBC1blSRgHFdk1Ko6IsY81XP7bKvhrcRhBrOpB7Iq0tGyG/mUQW4dy0PEDAwpOANKGHo4AAAAASUVORK5CYII=" alt='Released'/>
                        <p>{props.released}</p>
                    </div>
                    <div className="rating">
                        <img src="https://img.icons8.com/ios/16/f9bd2c/pixel-star.png" alt="star-icon"/>
                        <p>{props.rating}</p>
                    </div>
                </div> */}
                {/* <hr /> */}
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