import Card from './Card';

export default function Cards(props) {
    return (
        <div className='cards'>
            {props.videogames && props.videogames.length > 0 ? (
                props.videogames.map((videogame) => {
                    return (
                        <Card
                            key={videogame.id}
                            id={videogame.id}
                            name={videogame.name}
                            description={videogame.description}
                            platforms={videogame.platforms}
                            image={videogame.image}
                            released={videogame.released}
                            rating={videogame.rating}
                            genres={videogame.genres}
                        />
                    )
                })
            ) : (
                <div>No videogames available</div>
            )
            }
        </div>
    );
}