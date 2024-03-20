// import Reservation from '../../interfaces/reservation'
// import { useState } from 'react'
import { API_URL } from '../../settings'
import { useEffect } from 'react'
import { makeOptions } from '../../services/fetchUtils'

export default function ReservationsList() {
    // const [reservations, setReservations] = useState<Reservation[]>([])
    const options = makeOptions('GET', null, undefined, true)

    useEffect(() => {
        async function getit() {
            const response = await fetch(`${API_URL}/reservations`, options)
            const data = await response.json()
            console.log(data)

            // setReservations(data)
        }
        getit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h2>Below is a list of reservations</h2>
            <div className="reservation-list-container">
                {/* {reservations.map((reservation) => (
                    <div key={reservation.id} className="reservation-list-card">
                        <h5>Movie: {reservation.showing.movie.name}</h5>
                        <p>Date: {reservation.showing.showingDate}</p>
                        <p>Time: {reservation.showing.startTime}</p>
                        {reservation.seats.map((seat) => {
                            return <p key={seat.id}>Seat: {seat.seatNumber}</p>
                        })}
                        <p>{reservation.user.username}</p>
                    </div>
                ))} */}
            </div>
        </div>
    )
}
