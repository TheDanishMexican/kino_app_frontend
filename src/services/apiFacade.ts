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

// Cinema interface
interface APICinema {
  name: string;
  location: string;
  halls: Array<APIHall>;
  
}

// Hall interface
interface APIHall {
  name: string;
  rows: number;
  cinema: APICinema;
  showings: Array<APIShowing>;
}

// Showing interface
interface APIShowing {
  movie: Movie;
  hall: APIHall;
  time: Date | string;
  price: number;
}

async function getCinemas(): Promise<Array<Movie>> {
  const options = makeOptions("GET", null, undefined, true);
  return fetch(`${API_URL}/cinemas`, options).then(handleHttpErrors);

}
async function postCinema(cinema:APICinema): Promise<Array<Movie>> {
  const options = makeOptions("POST", cinema, undefined, true);
  return fetch(`${API_URL}/cinemas`, options).then(handleHttpErrors);
}
async function putCinema(): Promise<Array<Movie>> {
  const options = makeOptions("PUT", null, undefined, true);
  return fetch(`${API_URL}/cinemas`, options).then(handleHttpErrors);

}

async function getHalls(): Promise<Array<Movie>> {
  const options = makeOptions("GET", null, undefined, true);
  return fetch(`${API_URL}/halls`, options).then(handleHttpErrors);


}

async function postHall(hall:APIHall): Promise<Array<Movie>> {
  const options = makeOptions("POST", hall, undefined, true);
  return fetch(`${API_URL}/halls`, options).then(handleHttpErrors);

}

async function putHall(): Promise<Array<Movie>> {
  const options = makeOptions("PUT", null, undefined, true);
  return fetch(`${API_URL}/halls`, options).then(handleHttpErrors);
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
  getCinemas,
  postCinema,
  putCinema,
  getHalls,
  postHall,
  putHall,
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};
