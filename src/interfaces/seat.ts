import Row from './row'

export default interface Seat {
    id: number
    seatNumber: string
    cinemaId: number
    hallId: number
    row: Row
}
