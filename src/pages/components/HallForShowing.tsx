import Seat from '../../interfaces/seat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/hallforshowing.css'

export default function HallForShowing() {
    const { showingId } = useParams()
    const [seats, setSeats] = useState<Seat[]>([])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}/seats`)
            .then((response) => response.json())
            .then((data) => setSeats(data))
    }, [showingId])

    return (
        <div>
            <h1>Seats</h1>
            <h5 style={{ color: 'purple' }}>
                ---------------------------------Screen
                here---------------------------------
            </h5>
            <div className="hall-container">
                <div className="hall-grid">
                    {seats.map((seat, index) => (
                        <div className="seat" key={index}>
                            <p>{seat.seatNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
