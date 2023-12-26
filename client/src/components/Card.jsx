import '../styles/components/card.css'

export default function Card(props) {
    return (
        <div className="card pixel-border">
            <div className='main'>
            <img className='card-image' src={props.image} alt={props.name}/>
            <h1>{props.name}</h1>
            <div className='platforms'>
                {props.platforms &&
                    props.platforms.map((platform, index) => {
                        return (
                            <div className='pixel' key={index}><p>{platform}</p></div>
                        )
                    })
                }
            </div>
            <div className='card-info'>
                <div className="released">
                <ins>🚀</ins>
                <p>{props.released}</p>
                </div>
                <div className="rating">
                <ins>★</ins>
                <p>{props.rating}</p>
                </div>
            </div>
            <hr />
            <div className='genres'>
                {props.genres &&
                    props.genres.map((genre, index) => {
                        return (
                            <div className='pixel' key={index}><p>{genre.name}</p></div>
                        )
                    })
                }
                {/* {props.genres} */}
            </div>
            </div>
        </div>
    );
}