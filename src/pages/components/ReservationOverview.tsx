import { useLocation } from 'react-router-dom'
import Seat from '../../interfaces/seat'
import '../styling/reservationoverview.css'
import { useNavigate } from 'react-router-dom'
import Row from '../../interfaces/row'

export default function ReservationOverview() {
    const location = useLocation()
    const navigate = useNavigate()
    const { seats, totalPrice, showing, rows, cinemaName } = location.state

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
            navigate('/succesPage')
        } catch (error) {
            console.error('Error adding reservation:', error)
        }
    }

    return (
        <div className="reservation-container">
            <h1 className="reservation-header">Complete Reservation here</h1>
            <div className="reservation-body">
                <div>
                    {seats.map((seat: Seat) => (
                        <div key={seat.id}>
                            <p>
                                Seat: {seat.seatNumber}, Row:{' '}
                                {rows.map((row: Row) => {
                                    if (row.id === seat.rowId) {
                                        return row.rowNumber
                                    }
                                })}
                            </p>
                        </div>
                    ))}
                </div>
                <p>
                    Cinema: <br></br> {cinemaName}
                </p>
                <p>
                    Hall: <br></br> {showing.hallId}
                </p>
                <p>
                    Total Price: <br></br>
                    {totalPrice} kr
                </p>
            </div>
            <button onClick={handleReservation} className="completeButton">
                Confirm reservation
            </button>
        </div>
    )
}
