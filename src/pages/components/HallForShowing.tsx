import Seat from '../../interfaces/seat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/hallforshowing.css'
import Showing from '../../interfaces/showing'
import { Link } from 'react-router-dom'
import { makeOptions } from '../../services/fetchUtils'
import Row from '../../interfaces/row'
import { API_URL } from '../../settings'

export default function HallForShowing() {
    const { showingId } = useParams()
    const [showing, setShowing] = useState<Showing>()
    const [reservedSeats, setReservedSeats] = useState<Seat[]>([])
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
    const [seatPrices, setSeatPrices] = useState<Map<number, number>>(new Map())
    const [rows, setRows] = useState<Row[]>([])
    const makeOption = makeOptions('GET', null, undefined, true)

    useEffect(() => {
        fetch(`${API_URL}/showings/${showingId}`, makeOption)
            .then((response) => response.json())
            .then((data) => setShowing(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showingId])

    useEffect(() => {
        fetch(`${API_URL}/showings/${showingId}/reserved_seats`, makeOption)
            .then((response) => response.json())
            .then((data) => setReservedSeats(data))
        console.log(`reserved seats: ${reservedSeats}`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showingId])

    useEffect(() => {
        fetch(`${API_URL}/showings/${showingId}/rows`, makeOption)
            .then((response) => response.json())
            .then((data) => setRows(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showingId])

    const fetchSeatPrice = async (seatId: number) => {
        try {
            const response = await fetch(
                `${API_URL}/showings/${showingId}/seat/${seatId}/price`,
                makeOption
            )
            const data = await response.json()
            return data.seatPrice
        } catch (error) {
            console.error('Error fetching seat price:', error)
            return null
        }
    }

    const handleSeatClick = async (seat: Seat) => {
        if (
            !reservedSeats.some(
                (reservedSeat) => reservedSeat.seatNumber === seat.seatNumber
            )
        ) {
            if (
                selectedSeats.some(
                    (selected) => selected.seatNumber === seat.seatNumber
                )
            ) {
                // If already selected, remove from selection
                setSelectedSeats(
                    selectedSeats.filter(
                        (selected) => selected.seatNumber !== seat.seatNumber
                    )
                )
            } else {
                // Otherwise, add to selection and fetch seat price

                const price = await fetchSeatPrice(seat.id)
                if (price !== null) {
                    rows.map((row) => {
                        if (row.id === seat.rowId) {
                            console.log(
                                `The row number for seat: ${seat.seatNumber} is: ${row.rowNumber} and row type: ${row.seatType} and the price is: ${price}`
                            )
                        }
                    })

                    setSeatPrices(new Map(seatPrices.set(seat.id, price)))
                    setSelectedSeats([...selectedSeats, seat])
                }
            }
        }
    }

    // Sort seats by order (uneven on left, even on right)

    const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => {
            return total + (seatPrices.get(seat.id) || 0)
        }, 0)
    }

    return (
        <div>
            <div className="header-hallshowing">
                <div className="header-title">
                    <div className="header-body">
                        <h1>Seats</h1>
                        {calculateTotalPrice() > 0 && (
                            <Link
                                to={{
                                    pathname: '/reservationOverview',
                                }}
                                state={{
                                    seats: selectedSeats,
                                    showing: showing,
                                    totalPrice: calculateTotalPrice(),
                                    rows: rows,
                                }}
                            >
                                <button className="paymentButton">
                                    Make reservation
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="header-footer">
                        <p>
                            Movie: <br></br>
                            {showing?.movie.name}
                        </p>
                        <p>
                            Time: <br></br>
                            {showing?.startTime}
                        </p>
                        <p>
                            Date: <br></br>
                            {showing?.showingDate}
                        </p>
                        <p>
                            Total Price: <br></br>
                            {calculateTotalPrice()} kr
                        </p>
                    </div>
                </div>
            </div>
            <div className="hall-container">
                <div className="hall">
                    {[...rows].reverse().map((row) => {
                        const sortedSeats = [...row.seats].sort((a, b) => {
                            // Extract the numeric part of the seat number
                            const numericSeatNumberA = parseInt(
                                a.seatNumber.replace(/\D/g, '')
                            )
                            const numericSeatNumberB = parseInt(
                                b.seatNumber.replace(/\D/g, '')
                            )

                            // Check if the seat numbers are odd or even
                            const isOddA = numericSeatNumberA % 2 !== 0
                            const isOddB = numericSeatNumberB % 2 !== 0

                            if (isOddA && isOddB) {
                                // If both numbers are odd, the larger number should come first
                                return numericSeatNumberB - numericSeatNumberA
                            } else if (!isOddA && !isOddB) {
                                // If both numbers are even, the smaller number should come first
                                return numericSeatNumberA - numericSeatNumberB
                            } else {
                                // If one number is odd and the other is even, the odd number should come first
                                return isOddA ? -1 : 1
                            }
                        })

                        return (
                            <div
                                key={row.id}
                                className="row"
                                id={'row-' + row.rowNumber}
                            >
                                {sortedSeats.map((seat) => (
                                    <div
                                        className={`seat ${
                                            reservedSeats.some(
                                                (reservedSeat) =>
                                                    reservedSeat.seatNumber ===
                                                    seat.seatNumber
                                            )
                                                ? 'reserved'
                                                : ''
                                        } ${
                                            selectedSeats.some(
                                                (selected) =>
                                                    selected.seatNumber ===
                                                    seat.seatNumber
                                            )
                                                ? 'selected'
                                                : ''
                                        }`}
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        {/* <p>{seat.seatNumber}</p> */}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                    <p>Movie Screen</p>
                </div>
            </div>
        </div>
    )
}
