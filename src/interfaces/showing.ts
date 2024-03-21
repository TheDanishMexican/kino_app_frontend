import { Movie } from '../services/apiFacade'
import Reservation from './reservation'

export default interface Showing {
    id: number
    hallId: number
    showingDate: string // Assuming you are using ISO format for date (e.g., "2024-03-18")
    startTime: string // Assuming you are using ISO format for time (e.g., "16:10:00")
    endTime: string // Assuming you are using ISO format for time (e.g., "18:00:00")
    durationInMinutes: number
    cinemaId: number
    price: number
    reservations: Reservation[]
    movie: Movie
    specialMovie: boolean
    is3dMovie: boolean
}
