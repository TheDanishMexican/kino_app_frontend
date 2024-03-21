import AdminNavbar from './components/AdminNavbar'
import { useEffect, useState } from 'react'
import Showing from '../interfaces/showing'
import { API_URL } from '../settings'
import './styling/adminshowingpage.css'
import AddShowingDialog from './components/AddShowingDialog'
import { Dialog } from '@mui/material'

export default function AdminShowingsPage() {
    const [showings, setShowings] = useState<Showing[]>([])

    const [openDialog, setOpenDialog] = useState(false)

    function handleOpenDialog() {
        setOpenDialog(true)
    }

    function handleCloseDialog() {
        setOpenDialog(false)
    }

    useEffect(() => {
        async function getShowings() {
            const response = await fetch(`${API_URL}/showings`)
            const data = await response.json()

            setShowings(data)
        }

        getShowings()
    }, [])

    async function deleteShowing(showingId: number) {
        const confirm = window.confirm(
            `Are you  sure you want to delete showing with id: ${showingId}`
        )

        if (confirm) {
            const response = await fetch(`${API_URL}/showings/${showingId}`)
            if (response.ok) {
                setShowings((prevShowings) =>
                    prevShowings.filter((showing) => showing.id != showingId)
                )
            }
            console.log(`deleted showing with id: ${showingId}`)
        }
    }

    return (
        <div>
            <AdminNavbar />
            <button
                className="add-showing-button"
                onClick={() => handleOpenDialog()}
            >
                Add Showing
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Movie</th>
                        <th>Hall</th>
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
                            <td>{showing.hallId}</td>
                            <td>{showing.showingDate}</td>
                            <td>{showing.startTime}</td>
                            <td>
                                <button
                                    className="delete-button-showings"
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
            <Dialog
                className="dialog-add-showing"
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <AddShowingDialog />
            </Dialog>
        </div>
    )
}
