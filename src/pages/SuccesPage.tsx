import { Link } from 'react-router-dom'

export default function SuccesPage() {
    return (
        <div>
            <h1>Reservation successful!</h1>
            <p>
                You will receive an email with your tickets and reservation
                details.
            </p>
            <Link to="/">
                <button className="completeButton">Back to frontpage</button>
            </Link>
        </div>
    )
}
