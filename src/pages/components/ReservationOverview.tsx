import { useLocation } from 'react-router-dom'
import Seat from '../../interfaces/seat'
import '../styling/reservationoverview.css'

export default function ReservationOverview() {
    const location = useLocation()
    const { seats, totalPrice, showing } = location.state

    const showingId = showing.id
    const hallId = showing.hallId
    const username = localStorage.getItem('username')
    const seatPrice = totalPrice / seats.length

    const handleReservation = async () => {
        try {
            const response = await fetch('http://localhost:8080/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seats,
                    showingId,
                    hallId,
                    totalPrice,
                    seatPrice,
                    userName: username, // Include the retrieved username
                }),
            })
            const data = await response.json()
            console.log(`Reservation added:`, data)
        } catch (error) {
            console.error('Error adding reservation:', error)
        }
    }

    return (
        <div>
            <h1>Complete Reservation here</h1>
            <div>
                {seats.map((seat: Seat) => (
                    <div key={seat.id}>
                        <p>
                            Seat: {seat.seatNumber}, Row: {seat.rowId}
                        </p>
                    </div>
                ))}
            </div>
            <p>
                Hall: <br></br> {showing.hallId}
            </p>
            <p>
                Total Price: <br></br>
                {totalPrice} kr
            </p>
            <button onClick={handleReservation} className="completeButton">
                Confirm reservation
            </button>
        </div>
    )
}
