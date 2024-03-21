import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const MOVIES_URL = API_URL + "/movies";


interface Movie {
  id?: number;
  name: string;
  posterUrl: string;
  description: string;
  releaseDate: Date | string;
  duration: number;
  actors: Array<string>;
  genres: Array<string>;
  created: Date | string;
  edited: Date | string;
}


async function getMovies(): Promise<Array<Movie>> {
  console.log("genre");

  return fetch(MOVIES_URL)
    .then(handleHttpErrors);

}

async function getMovie(id: number): Promise<Movie> {
  return await fetch(MOVIES_URL + "/" + id).then(handleHttpErrors);
}

async function addMovie(newMovie: Movie): Promise<Movie> {

  const options = makeOptions("POST", newMovie, undefined, true);
  return fetch(MOVIES_URL, options).then(handleHttpErrors);
}

async function updateMovie(updatedMovie: Movie): Promise<Movie> {
  if (!updatedMovie.id) {
    throw new Error("Movie must have an id to be updated");
  }

  const options = makeOptions("PUT", updatedMovie, undefined, true);
  const URL = `${MOVIES_URL}/${updatedMovie.id}`;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteMovie(id: number): Promise<Movie> {

  const options = makeOptions("DELETE", null, undefined, true);
  return fetch(`${MOVIES_URL}/${id}`, options).then(handleHttpErrors);
}


export type { Movie };
// eslint-disable-next-line react-refresh/only-export-components
export {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
