import Seat from './seat'

export default interface Reservation {
    id: number
    seats: Seat[]
    showingId: number
    hallId: number
    cinemaId: number
    totalPrice: number
    seatPrice: number
}
