import Hall from './hall'
import Seat from './seat'
import SeatType from './seatType'

export default interface Row {
    id: number
    amountOfSeats: number
    rowNumber: number
    cinemaId: number
    hall: Hall
    seatType: SeatType
    seats: Seat[]
}
