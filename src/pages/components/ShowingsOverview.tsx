import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Showing from '../../interfaces/showing'
import '../styling/showingsoverview.css'

export default function ShowingsOverview() {
    const { cinemaId } = useParams()
    const [showings, setShowings] = useState<Showing[]>([])

    useEffect(() => {
        fetch(`http://localhost:8080/cinemas/${cinemaId}/showings`)
            .then((response) => response.json())
            .then((data) => setShowings(data))
    }, [cinemaId])

    return (
        <div>
            <h1>Showings</h1>
            <ul style={{ listStyle: 'none' }}>
                {showings.map((showing, index) => (
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/showing/${showing.id}/seats`}
                        key={index}
                    >
                        <li className="showing-card" key={index}>
                            <p>{showing.movie.name}</p>
                            <p>Duration: {showing.durationInMinutes} minutes</p>
                            <p>Date: {showing.showingDate}</p>
                            <p>{showing.startTime}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
