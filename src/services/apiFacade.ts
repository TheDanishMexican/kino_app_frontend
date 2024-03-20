import { API_URL } from "../settings";
import { User, UserToUpdate, CinemaToUpdate } from "./authFacade";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const MOVIES_URL = API_URL + "/movies";

interface Movie {
  id: number;
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

async function addCinema(Cinema: CinemaToUpdate): Promise<CinemaToUpdate> {
  const options = makeOptions("POST", Cinema, undefined, true);
  return fetch(API_URL + "/api/cinema", options).then(handleHttpErrors);
}

async function getCinemas(){
  const options = makeOptions("GET",null, undefined, true);
return await fetch(API_URL + "/api/user-with-role/users", options).then(
  handleHttpErrors
);
}


async function deleteCinema(name: string) {
  const options = makeOptions("DELETE", null, undefined, true);
  return fetch(API_URL + "/api/user-with-role/" + name, options).then(
    handleHttpErrors
  );
}

async function updateCinema(cinema: CinemaToUpdate) {
  const options = makeOptions("PUT", cinema, undefined, true);
  return fetch(
    API_URL + "/api/cinema/update-user/" + cinema.name,
    options
  ).then(handleHttpErrors);
}


async function getMovies(): Promise<Array<Movie>> {
  console.log("genre");

  const res = fetch(MOVIES_URL).then(handleHttpErrors);
  return res;
}

async function getMovie(id: number): Promise<Movie> {
  return await fetch(MOVIES_URL + "/" + id).then(handleHttpErrors);
}
async function addMovie(newMovie: Movie): Promise<Movie> {
  // const token = localStorage.getItem("token");
  const method = newMovie.id ? "PUT" : "POST";
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };
  const options = makeOptions(method, newMovie, headers, true);
  const URL = newMovie.id ? `${MOVIES_URL}/${newMovie.id}` : MOVIES_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteMovie(id: number): Promise<Movie> {
  // const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(`${MOVIES_URL}/${id}`, options).then(handleHttpErrors);
}

async function getUsers() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  const res = await fetch(API_URL + "/api/user-with-role/users", options).then(
    handleHttpErrors
  );
  return res;
}

async function deleteUser(username: string) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(API_URL + "/api/user-with-role/" + username, options).then(
    handleHttpErrors
  );
}

async function updateUser(user: UserToUpdate) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", user, headers, true);
  return fetch(
    API_URL + "/api/user-with-role/update-user/" + user.username,
    options
  ).then(handleHttpErrors);
}

async function createUser(user: User) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("POST", user, headers, true);
  return fetch(API_URL + "/api/user-with-role", options).then(handleHttpErrors);
}

export type { Movie };
// eslint-disable-next-line react-refresh/only-export-components
export {
  addCinema,
  getCinemas,
  deleteCinema,
  updateCinema,
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};
