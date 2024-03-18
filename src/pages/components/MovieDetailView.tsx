import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../services/apiFacade'; // Assumed function

export default function MovieDetailView() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');
    const { movieId } = useParams(); // Extract movieId from URL

    useEffect(() => {
        getMovie(movieId)
            .then(setMovie)
            .catch(() => setError('Error fetching movie details'));
    }, [movieId]);

    if (error) {
        return <p>{error}</p>;
    }

   

    return (
        <div className="movie-detail">
            <h2>{movie.name}</h2>
            <img src={movie.posterUrl} alt={`Poster for ${movie.name}`} />
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate}</p>
        <strong>Actors:</strong>
        <ul>
          {movie.actors.map((actor, index) => (
            <li key={index}>{actor}</li> // Assuming actors is an array of strings
          ))}
        </ul>
        <strong>Genres:</strong>
        <ul>
          {movie.genres.map((genre, index) => (
            <li key={index}>{genre}</li> // Assuming genres is an array of strings
          ))}
        </ul>
      </div>
  
  );
}
