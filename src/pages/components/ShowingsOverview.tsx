import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/showingsoverview.css'
import Showing from '../../interfaces/showing'
import { Link } from 'react-router-dom'

export default function ShowingsOverview() {
    const { cinemaId } = useParams()
    const [showings, setShowings] = useState<Showing[]>([])
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8080/cinemas/${cinemaId}/showings`)
            .then((response) => response.json())
            .then((data) => setShowings(data))
    }, [cinemaId])

    const toggleShowings = (date: Date) => {
        setSelectedDate(selectedDate === date ? null : date)
    }

    const generateNextSevenDays = () => {
        const dates: Date[] = []
        const today = new Date()
        for (let i = 0; i < 7; i++) {
            const nextDate = new Date(today)
            nextDate.setDate(today.getDate() + i)
            dates.push(nextDate)
        }
        return dates
    }

    const nextSevenDays = generateNextSevenDays()

    return (
        <div>
            <h1>Showings</h1>
            <div className="date-header">
                {nextSevenDays.map((date, index) => (
                    <div
                        className="date"
                        key={index}
                        onClick={() => toggleShowings(date)}
                    >
                        {date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                ))}
            </div>
            <div className="showings-container">
                {selectedDate &&
                    showings
                        .filter((showing) => {
                            const showingDate = new Date(showing.showingDate)
                            return (
                                showingDate.getDate() === selectedDate.getDate()
                            )
                        })
                        .map((showing, index) => (
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={`/showing/${showing.id}/seats`}
                                key={index}
                            >
                                <div className="showing-card" key={index}>
                                    <p>{showing.movie.name}</p>
                                    <p>
                                        Duration: {showing.durationInMinutes}{' '}
                                        minutes
                                    </p>
                                    <p>Date: {showing.showingDate}</p>
                                    <p>{showing.startTime}</p>
                                </div>
                            </Link>
                        ))}
                {!selectedDate && <p>Please select a date to view showings</p>}
                {selectedDate &&
                    showings.filter(
                        (showing) =>
                            new Date(showing.showingDate).getDate() ===
                            selectedDate.getDate()
                    ).length === 0 && (
                        <p>
                            No showings on {selectedDate.toLocaleDateString()}
                        </p>
                    )}
            </div>
        </div>
    )
}
