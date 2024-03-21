import { API_URL } from "../settings";
import { User, UserToUpdate } from "./authFacade";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
import Cinema from "../interfaces/cinema";
import Hall from "../interfaces/hall";
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


async function getCinemas(): Promise<Array<Cinema>> {
  const options = makeOptions("GET", null, undefined, true);
  return fetch(`${API_URL}/cinemas`, options).then(handleHttpErrors);

}
async function postCinema(cinema:Cinema): Promise<Cinema> {
  const options = makeOptions("POST", cinema, undefined, true);
  return fetch(`${API_URL}/cinemas`, options).then(handleHttpErrors);
}
async function putCinema(cinema:Cinema): Promise<Cinema> {
  const options = makeOptions("PUT", cinema, undefined, true);
  return fetch(`${API_URL}/cinemas/${cinema.id}`, options).then(handleHttpErrors);
}
async function deleteCinema(id: number): Promise<Cinema> {
  const options = makeOptions("DELETE", null, undefined, true);
  return fetch(`${API_URL}/cinemas/${id}`, options).then(handleHttpErrors);
}

async function getHalls(): Promise<Array<Hall>> {
  const options = makeOptions("GET", null, undefined, true);
  return await fetch(`${API_URL}/halls`, options).then(handleHttpErrors);


}

interface int {
  int: number;
}
async function postHall(hall:Hall, cinemaId: int): Promise<Hall> {
  const options = makeOptions("POST", hall, undefined, true);
  return fetch(`${API_URL}/${cinemaId}/halls`, options).then(handleHttpErrors);

}

async function putHall(hall:Hall): Promise<Hall> {
  const options = makeOptions("PUT", hall, undefined, true);
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

async function deleteMovie(id: number) {

  const options = makeOptions("DELETE", null, undefined, true);

  const response = await fetch(`${MOVIES_URL}/${id}`, options);

  if(response.ok) {
    console.log("Movie deleted");
  }
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
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("POST", user, headers, true);
  return fetch(API_URL + "/api/user-with-role", options).then(handleHttpErrors);
}

async function getUserReservations() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/reservations/user", options).then(handleHttpErrors);
}

async function deleteUserReservation(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  const response = await fetch(API_URL + "/reservations/" + id, options);

  if (!response.ok) {
    return handleHttpErrors(response);
  }

  const data = await response.text();

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

async function getShowing(id: number) {
  try {
    const response = await fetch(`${API_URL}/showings/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching showing:", error);
  }
}

export type { Movie };
// eslint-disable-next-line react-refresh/only-export-components
export {
  getCinemas,
  postCinema,
  putCinema,
  deleteCinema,
  getHalls,
  postHall,
  putHall,
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
  getUserReservations,
  deleteUserReservation,
  getShowing
};
