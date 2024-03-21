import Reservation from '../../interfaces/reservation'
import { useState, useEffect } from 'react'
import { API_URL } from '../../settings'
import { makeOptions } from '../../services/fetchUtils'
import Showing from '../../interfaces/showing'
import '../styling/reservationslist.css'

export default function ReservationsList() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [showings, setShowings] = useState<Showing[]>([])
    const options = makeOptions('GET', null, undefined, true)
    const optionsForDelete = makeOptions('DELETE', null, undefined, true)

    useEffect(() => {
        async function getReservations() {
            try {
                const response = await fetch(`${API_URL}/reservations`, options)
                const data = await response.json()
                setReservations(data)
            } catch (error) {
                console.error('Error fetching reservations:', error)
            }
        }
        getReservations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchShowings = async () => {
            const promises = reservations.map(async (reservation) => {
                return await getShowing(reservation.showingId)
            })

            const fetchedShowings = await Promise.all(promises)
            setShowings(fetchedShowings) // Set the showings state
        }

        if (reservations.length > 0) {
            fetchShowings()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations])

    async function getShowing(showingId: number) {
        try {
            const response = await fetch(
                `${API_URL}/showings/${showingId}`,
                options
            )
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching showing:', error)
        }
    }

    async function deleteReservation(reservationId: number) {
        const confirm = window.confirm(
            `Do you want to delete reservationID: ${reservationId}`
        )

        if (confirm) {
            try {
                const response = await fetch(
                    `${API_URL}/reservations/${reservationId}`,
                    optionsForDelete
                )

                // Check if the status indicates success (e.g., 200)
                if (response.ok) {
                    // Return null or a success message if deletion is successful
                    setReservations((prevReservations) =>
                        prevReservations.filter(
                            (reservation) => reservation.id !== reservationId
                        )
                    )
                    console.log('All is well')
                } else {
                    // Handle non-successful deletion (e.g., 404 for not found)
                    const errorData = await response.json()
                    throw new Error(
                        `Error deleting reservation: ${errorData.message}`
                    )
                }
            } catch (error) {
                console.error(error)
                // Return null or an error message if there's an error during deletion
                return null
            }
        }
    }

    return (
        <div>
            <div className="reservation-list-container">
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Movie</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th className="seats-table-header">Seats</th>
                            <th>User ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, index) => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{showings[index]?.movie.name}</td>
                                <td>{showings[index]?.showingDate}</td>
                                <td>{showings[index]?.startTime}</td>
                                <td>
                                    <ul className="reservation-seats-list">
                                        {reservation.seats.map((seat) => (
                                            <li key={seat.id}>
                                                Seat: {seat.seatNumber}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{reservation.username}</td>
                                <td>
                                    <button
                                        onClick={async () =>
                                            deleteReservation(reservation.id)
                                        }
                                        className="delete-button-reservations"
                                    >
                                        Delete order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
