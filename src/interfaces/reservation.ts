import Seat from './seat'
import { User } from '../services/authFacade'

export default interface Reservation {
    id: number
    seats: Seat[]
    showingId: number
    hallId: number
    cinemaId: number
    totalPrice: number
    seatPrice: number
    user: User
    username: string
}
