import Seat from '../../interfaces/seat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
            <h1>Hall for showings</h1>
            <ul style={{ listStyle: 'none' }}>
                {seats.map((seat, index) => (
                    <li key={index}>
                        <p>{seat.seatNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
