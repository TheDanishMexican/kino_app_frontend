import Cinema from '../interfaces/cinema'
import { useEffect, useState } from 'react'
import './styling/cinemaspage.css'

export default function CinemasPage() {
    const [cinemas, setCinemas] = useState<Cinema[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/cinemas')
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
            <ul style={{ listStyle: 'none' }}>
                {cinemas.map((cinema, index) => (
                    <li className="cinema-card" key={index}>
                        <h3>{cinema.name}</h3>
                        <p>{cinema.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
