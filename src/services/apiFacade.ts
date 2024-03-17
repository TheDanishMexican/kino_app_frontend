import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const MOVIES_URL = API_URL + "/movies";


interface Movie {
  id: number | null;
  name: string;
  posterUrl: string;
  description: string;
  releaseDate: Date | string;
  duration: number;
  actors: Array<string>;
  genres: Array<string>;
  created: Date | string;
  updated: Date | string;
}


async function getMovies(genre: string): Promise<Array<Movie>> {
  console.log("genre", genre);
  const queryParams = genre ? "?genre=" + encodeURIComponent(genre) : "";
  return fetch(MOVIES_URL + queryParams)
    .then(handleHttpErrors);
}

async function getMovie(id: number): Promise<Movie> {
  return fetch(MOVIES_URL + "/" + id).then(handleHttpErrors);
}
async function addMovie(newMovie: Movie): Promise<Movie> {
  // const token = localStorage.getItem("token");
  const method = newMovie.id ? "PUT" : "POST";
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };
  const options = makeOptions(method, newMovie, headers);
  const URL = newMovie.id ? `${MOVIES_URL}/${newMovie.id}` : MOVIES_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteMovie(id: number): Promise<Movie> {
  // const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers);
  return fetch(`${MOVIES_URL}/${id}`, options).then(handleHttpErrors);
}


export type { Movie };
// eslint-disable-next-line react-refresh/only-export-components
export {
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
};