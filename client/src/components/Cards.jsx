import { Card, Loading } from '../components';

import Filters from './Filters';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

export default function Cards(props) {
    const isLoadingCards = useSelector(state => state.isLoadingCards);

    return (
        <div className="content">
            <Loading isLoading={isLoadingCards}></Loading>
            <Filters></Filters>
            <div className={`cards ${isLoadingCards ? 'hidden' : ''}`}>
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
                    <div>
                        <h2 className="game-over">GAME<br />OVER</h2>
                        <p>No videogames found.</p>
                    </div>
                )
                }
            </div>
            <Pagination currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={(page) => props.onPageChange(page)} />
        </div>
    );
}