import Seat from '../../interfaces/seat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/hallforshowing.css'
import Showing from '../../interfaces/showing'

export default function HallForShowing() {
    const { showingId } = useParams()
    const [seats, setSeats] = useState<Seat[]>([])
    const [showing, setShowing] = useState<Showing>()
    const [reservedSeats, setReservedSeats] = useState<Seat[]>([])
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}/seats`)
            .then((response) => response.json())
            .then((data) => setSeats(data))
    }, [showingId])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}`)
            .then((response) => response.json())
            .then((data) => setShowing(data))
    }, [showingId])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}/reserved_seats`)
            .then((response) => response.json())
            .then((data) => setReservedSeats(data))
    }, [showingId])

    const handleSeatClick = (seat: Seat) => {
        if (
            !reservedSeats.some(
                (reservedSeat) => reservedSeat.seatNumber === seat.seatNumber
            )
        ) {
            if (
                selectedSeats.some(
                    (selected) => selected.seatNumber === seat.seatNumber
                )
            ) {
                setSelectedSeats(
                    selectedSeats.filter(
                        (selected) => selected.seatNumber !== seat.seatNumber
                    )
                )
            } else {
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    return (
        <div>
            <h1>Seats</h1>
            <p>
                Movie: {showing?.movie.name} -- Time: {showing?.startTime} --
                Date: {showing?.showingDate}
            </p>
            <h5 style={{ color: 'purple' }}>
                ---------------------------------Screen
                here---------------------------------
            </h5>
            <div className="hall-container">
                <div className="hall-grid">
                    {seats.map((seat, index) => (
                        <div
                            className={`seat ${
                                reservedSeats.some(
                                    (reservedSeat) =>
                                        reservedSeat.seatNumber ===
                                        seat.seatNumber
                                )
                                    ? 'reserved'
                                    : ''
                            } ${
                                selectedSeats.some(
                                    (selected) =>
                                        selected.seatNumber === seat.seatNumber
                                )
                                    ? 'selected'
                                    : ''
                            }`}
                            key={index}
                            onClick={() => handleSeatClick(seat)}
                        >
                            <p>{seat.seatNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
