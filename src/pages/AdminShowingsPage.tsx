import AdminNavbar from './components/AdminNavbar'
import { useEffect, useState } from 'react'
import Showing from '../interfaces/showing'
import { API_URL } from '../settings'
import './styling/adminshowingpage.css'

export default function AdminShowingsPage() {
    const [showings, setShowings] = useState<Showing[]>([])

    useEffect(() => {
        async function getShowings() {
            const response = await fetch(`${API_URL}/showings`)
            const data = await response.json()

            setShowings(data)
        }

        getShowings()
    }, [])

    async function deleteShowing(showingId: number) {
        const response = await fetch(`${API_URL}/showings/${showingId}`)
        if (response.ok) {
            setShowings((prevShowings) =>
                prevShowings.filter((showing) => showing.id != showingId)
            )
        }
        console.log(`deleted showing with id: ${showingId}`)
    }

    return (
        <div>
            <AdminNavbar />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Movie</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showings.map((showing) => (
                        <tr key={showing.id}>
                            <td>{showing.id}</td>
                            <td>{showing.movie.name}</td>
                            <td>{showing.showingDate}</td>
                            <td>{showing.startTime}</td>
                            <td>
                                <button
                                    onClick={async () =>
                                        deleteShowing(showing.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
