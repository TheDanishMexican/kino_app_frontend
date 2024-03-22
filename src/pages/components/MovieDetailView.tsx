import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, getMovie } from "../../services/apiFacade";
import "../styling/movieDetailView.css";
import { Link } from "react-router-dom";

export default function MovieDetailView() {
  const [movie, setMovie] = useState<Movie | null>();
  const [error, setError] = useState("");
  const [id, setId] = useState(0);
  const movieId = useParams().movieId; // Extract movieId from URL

  useEffect(() => setId(Number(movieId)), [movieId]);

  useEffect(() => {
    if (id != 0) {
      getMovie(id)
        .then((movie) => {
          if (movie !== null) {
            setMovie(movie);
          }
        })
        .catch(() => setError("Error fetching movie details"));
    }
    console.log("Given id: " + id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="movie-detail">
      {movie && (
        <>
          <img
            src={movie.posterUrl}
            alt={`Poster for ${movie.name}`}
            className="movie-poster"
          />
          <div className="movie-detail-info">
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {movie.releaseDate.toString()}</p>
            <strong>Actors:</strong>
            <ul>
              {movie.actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
            <strong>Genres:</strong>
            <ul>
              {movie.genres.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Link to={`/biografer`}>
        <button className="booking-button">
          Buy Tickets for this movie💸🍿
        </button>
      </Link>
    </div>
  );
}
