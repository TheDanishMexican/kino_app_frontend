import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function SuccesPage() {
    const location = useLocation()
    const { id } = location.state

    return (
        <div>
            <h2>Reservation successful!</h2>
            <p>
                You will receive an email with your tickets and reservation
                details.
            </p>
            <h1>ORDER ID: {id}</h1>
            <Link to="/">
                <button className="completeButton">Back to frontpage</button>
            </Link>
        </div>
    )
}
