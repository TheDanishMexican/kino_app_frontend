import "../styling/adminMovie.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  getMovies,
  deleteMovie,
  addMovie,
  updateMovie,
} from "../../services/apiFacade";
import { Button } from "@mui/material";
import MovieAdminDialog from "./MovieAdminEditDialog";
import MovieAdminAddDialog from "./MovieAdminAddDialog";
import AdminNavbar from "./AdminNavbar";
import "../styling/adminMovie.css";
import { Movie as APIMovie } from "../../services/apiFacade";

export default function AdminMoviesList() {
  const [movies, setMovies] = useState<Array<APIMovie>>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editMovie, setEditingMovie] = useState<APIMovie | null>(null);

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res))
      .catch(() => setError("Error fetching movies. Is the server running?"));
  }, []);

  const handleEditClick = (movie: APIMovie) => {
    setEditingMovie(movie);
    setOpen(true);
  };

  const handleSave = async (movie: APIMovie) => {
    try {
      let savedMovie: APIMovie;
      if ("id" in movie && movie.id !== 0) {
        savedMovie = await updateMovie(movie);
        setMovies(movies.map((m) => (m.id === savedMovie.id ? savedMovie : m)));
      } else {
        savedMovie = await addMovie(movie);
        setMovies([...movies, savedMovie]);
      }

      setOpen(false);
      setError("");
    } catch (error) {
      console.error("Failed to save movie:", error);
      setError("Failed to save movie. Please try again.");
    }
  };

  const handleDeleteClick = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?, You can only delete it if there are no more showings of this movie."
    );
    if (confirmDelete) {
      try {
        await deleteMovie(id);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (error) {
        console.error("Failed to delete movie:", error);
        setError("Failed to delete movie.");
      }
    }
  };

  const handleAddMovieClick = () => {
    setEditingMovie(null);

    setOpen(true);
  };

  const MovieListItems = movies.map((movie, index) => (
    <tr key={index}>
      <td>{movie.name}</td>
      <td>{movie.duration}</td>
      <td>{movie.description}</td>
      <td>
        <Button onClick={() => handleEditClick(movie)}>
          <EditIcon />
        </Button>
      </td>
      <td>
        <Button color="error" onClick={() => handleDeleteClick(movie.id || 0)}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <AdminNavbar />
      <div id="admin-movies-table-container">
        <div id="admin-movies-table-header">
          <button onClick={handleAddMovieClick} id="admin-movies-add-movie">
            Add movie
          </button>
        </div>
        <table id="admin-movies-table">
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {MovieListItems}
            {error && <p className="error-message">{error}</p>}
          </tbody>
        </table>
        <MovieAdminDialog
          open={open}
          movie={editMovie}
          onSave={(movie) => {
            handleSave(movie);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />

        <MovieAdminAddDialog
          open={open && editMovie === null}
          onSave={(newMovie: APIMovie) => {
            handleSave(newMovie);
          }}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
