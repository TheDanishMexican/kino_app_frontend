
import "../styling/moviespage.css";
import { useEffect, useState } from 'react';
import { Movie as APIMovie, getMovies } from '../../services/apiFacade';
// import { useSearchParams } from 'react-router-dom';

import { Link } from "react-router-dom";

export default function Movies() {

    const [movies, setMovies] = useState<Array<APIMovie>>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Assuming getMovies can accept a category for filtering
        getMovies()// Adjust this call based on the actual API and how it's meant to be used
            .then((res) => setMovies(res))
            .catch(() => setError('Error fetching movies, is the server running?'));
        
    }, []); // Add initialCategory to the dependencies array


    const movieListItems = movies.map((movie,index) => (

    <Link to={`/movies/${movie.id}`} key={index}>           
       <div >
            <article className="grid-item-movie">
                <img src={movie.posterUrl} alt={`Poster for ${movie.name}`} />
                <h4>{movie.name}</h4>
                {/* <p>{movie.description}</p> */}
            </article>
        </div>  
    </Link>
    ));

    return (
        <div key={1}>

            {error && <p>{error}</p>}
            <div className="movie-list">{movieListItems}</div>
        </div>
    );
}

