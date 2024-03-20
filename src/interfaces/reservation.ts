import Showing from './showing'
import Seat from './seat'
import { User } from '../services/authFacade'

export default interface Reservation {
    id: number
    seats: Seat[]
    showing: Showing
    hallId: number
    cinemaId: number
    totalPrice: number
    seatPrice: number
    user: User
}
