import { useEffect, useState } from 'react';

import Card from './Card';
import Pagination from './Pagination';
import axios from 'axios';

export default function Cards(props) {
    const [videogames, setVideogames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const getVideogames = async () => {
        try {
            const response = await axios(`http://localhost:3001/videogames?page=${currentPage}&limit=15`);
            setVideogames(response.data);
            console.log(response.headers);
            setTotalPages(Math.ceil(response.headers['total-videogames'] / 15));
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        getVideogames();
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
        <div className='cards'>
            {videogames && videogames.length > 0 ? (
                videogames.map((videogame) => {
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}