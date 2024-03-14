
import "../styling/mainpage.css";
import { useEffect, useState } from 'react';
import { Movie as APIMovie, getMovies } from '../../services/apiFacade';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
    const [queryString] = useSearchParams();
    const genre = queryString.get('genre');
    const [movies, setMovies] = useState<Array<APIMovie>>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Assuming getMovies can accept a category for filtering
        //@ts-expect-error // Ignore this line, it's just to make the example work
        getMovies(genre)// Adjust this call based on the actual API and how it's meant to be used
            .then((res) => setMovies(res))
            .catch(() => setError('Error fetching movies, is the server running?'));
    }, [genre]); // Add initialCategory to the dependencies array

    const movieListItems = movies.map((movie) => (

        <div key={movie.id}>
            <article className="grid-item-movie">
                <img src={movie.posterUrl} alt={`Poster for ${movie.name}`} />
                <h4>{movie.name}</h4>
                {/* <p>{movie.description}</p> */}
            </article>
        </div>  
    ));

    return (
        <div>
            {error && <p>{error}</p>}
            <div className="movie-list">{movieListItems}</div>
        </div>
    );
}

