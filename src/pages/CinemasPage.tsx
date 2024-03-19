import Cinema from '../interfaces/cinema'
import { useEffect, useState } from 'react'
import './styling/cinemaspage.css'
import { Link } from 'react-router-dom'
import { API_URL } from '../settings'

export default function CinemasPage() {
    const [cinemas, setCinemas] = useState<Cinema[]>([])

    useEffect(() => {
        fetch(`${API_URL}/cinemas`)
            .then((response) => response.json())
            .then((data) => setCinemas(data))
    }, [])

    return (
        <div>
            <h1>Welcome to the Cinemas Page</h1>
            <p>
                This page is meant for displaying the different cinemas and
                picking showings.
            </p>
            <ul className="cinemas-container" style={{ listStyle: 'none' }}>
                {cinemas.map((cinema, index) => (
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/cinemas/${cinema.id}/showings`}
                        key={index}
                    >
                        <li className="cinema-card" key={index}>
                            <h3>{cinema.name}</h3>
                            <p>{cinema.location}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
