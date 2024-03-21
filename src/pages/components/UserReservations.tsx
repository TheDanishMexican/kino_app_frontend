import { useState, useEffect } from "react";
import {
  deleteUserReservation,
  getUserReservations,
  getShowing,
} from "../../services/apiFacade";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import "../styling/userreservations.css";

import Reservation from "../../interfaces/reservation";
import Showing from "../../interfaces/showing";

export default function UserReservations() {
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showings, setShowings] = useState<Showing[]>([]);

  const fetchReservations = () => {
    getUserReservations()
      .then((res) => setReservations(res))
      .catch(() =>
        setError("Error fetching reservations, is the server running?")
      );
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchShowings = async () => {
      const promises = reservations.map(async (reservation: Reservation) => {
        return await getShowing(reservation.showingId);
      });

      const fetchedShowings = await Promise.all(promises);
      setShowings(fetchedShowings);
    };

    if (reservations.length > 0) {
      fetchShowings();
    }
  }, [reservations]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Er du sikker på, at du vil slette bestillingen?"
    );
    if (confirmDelete) {
      try {
        await deleteUserReservation(id);
        setReservations(
          reservations.filter(
            (reservation: Reservation) => reservation.id !== id
          )
        );
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const userReservationsList = reservations.map(
    (reservation: Reservation, index) => (
      <tr key={reservation.id}>
        <td>{reservation.id}</td>
        <td>{showings[index]?.movie.name}</td>
        <td>
          {reservation.seats.map((seat) => {
            return seat.seatNumber + ", ";
          })}
        </td>
        <td>
          {new Date(showings[index]?.showingDate).toLocaleString("da-DK")}
        </td>
        <td>{reservation.totalPrice} kr.</td>
        <td className="list-button">
          <Button onClick={() => handleDelete(reservation.id)} color="error">
            <DeleteIcon />
          </Button>
        </td>
      </tr>
    )
  );

  return (
    <div id="user-reservations-table-container">
      <table id="user-reservations-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Film</th>
            <th>Sæder</th>
            <th>Dato</th>
            <th>Pris</th>
            <th id="reservations-table-delete-header">Slet</th>
          </tr>
        </thead>
        <tbody>{userReservationsList}</tbody>
      </table>
      {error && <p>{error}</p>}
    </div>
  );
}
