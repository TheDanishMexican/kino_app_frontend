import { useLocation } from 'react-router-dom'
import Seat from '../../interfaces/seat'
import '../styling/reservationoverview.css'
import { useNavigate } from 'react-router-dom'
import Row from '../../interfaces/row'
import { API_URL } from '../../settings'
import { makeOptions } from '../../services/fetchUtils'
import { useEffect, useState } from 'react'
import Cinema from '../../interfaces/cinema'

export default function ReservationOverview() {
    const location = useLocation()
    const navigate = useNavigate()
    const { seats, showing, rows, reservationPrice } = location.state
    const [cinema, setCinema] = useState<Cinema>()

    const showingId = showing.id
    const hallId = showing.hallId
    const username = localStorage.getItem('username')
    const makeOption = makeOptions('GET', null, undefined, false)
    const seatPrice = reservationPrice / seats.length

    useEffect(() => {
        console.log(`this is reservation_price: ${reservationPrice}`)

        fetch(`${API_URL}/cinemas/${showing.cinemaId}`, makeOption)
            .then((response) => response.json())
            .then((data) => setCinema(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showingId])

    const handleReservation = async () => {
        try {
            const response = await fetch(
                `${API_URL}/reservations`,
                makeOptions(
                    'POST',
                    {
                        seats,
                        showingId,
                        hallId,
                        totalPrice: reservationPrice,
                        seatPrice,
                        username,
                    },
                    undefined,
                    true
                )
            )
            const data = await response.json()
            const { id } = data
            console.log(`Reservation added with ID:${id}`)
            navigate('/succesPage', { state: { id } })
        } catch (error) {
            console.error('Error adding reservation:', error)
        }
    }

    return (
        <div className="reservation-container">
            <h1 className="reservation-header">Complete Reservation here</h1>
            <div className="reservation-body">
                <div className="info-row">
                    <p>
                        Movie: <br></br>
                        {showing?.movie.name}
                    </p>
                    <p>
                        Time: <br></br>
                        {showing?.startTime}
                    </p>
                    <p>
                        Date: <br></br>
                        {showing?.showingDate}
                    </p>
                </div>
                <div className="info-row">
                    <p>
                        Cinema: <br></br> {cinema?.name}
                    </p>
                    <p>
                        Hall: <br></br> {showing.hallId}
                    </p>
                    <p>
                        Total Price: <br></br>
                        {reservationPrice} kr
                    </p>
                </div>
                <div className="seats-row">
                    <p>Seats:</p>
                    {seats.map((seat: Seat) => (
                        <p key={seat.id}>
                            Seat: {seat.seatNumber}, Row:{' '}
                            {rows.map((row: Row) => {
                                if (row.id === seat.rowId) {
                                    return row.rowNumber
                                }
                            })}
                        </p>
                    ))}
                </div>
                <div className="surcharge-body">
                    {showing.is3dMovie && (
                        <p className="reservation-surcharge">
                            *3D movie +50 kr
                        </p>
                    )}
                    {showing.durationInMinutes > 170 && (
                        <p className="reservation-surcharge">
                            *Long movie +50 kr
                        </p>
                    )}
                    {seats.length < 5 && (
                        <p className="reservation-surcharge">
                            *Under 5 tickets +50kr
                        </p>
                    )}
                    {seats.length >= 10 && (
                        <p className="reservation-surcharge">
                            *Over 10 tickets 7% discount
                        </p>
                    )}
                </div>
            </div>
            <button onClick={handleReservation} className="completeButton">
                Confirm reservation
            </button>
        </div>
    )
}
