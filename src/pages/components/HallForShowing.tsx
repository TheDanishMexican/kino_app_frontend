// import Seat from '../../interfaces/seat'
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import '../styling/hallforshowing.css'
// import Showing from '../../interfaces/showing'

// export default function HallForShowing() {
//     const { showingId } = useParams()
//     const [seats, setSeats] = useState<Seat[]>([])
//     const [showing, setShowing] = useState<Showing>()
//     const [reservedSeats, setReservedSeats] = useState<Seat[]>([])
//     const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

//     useEffect(() => {
//         fetch(`http://localhost:8080/showings/${showingId}/seats`)
//             .then((response) => response.json())
//             .then((data) => setSeats(data))
//     }, [showingId])

//     useEffect(() => {
//         fetch(`http://localhost:8080/showings/${showingId}`)
//             .then((response) => response.json())
//             .then((data) => setShowing(data))
//     }, [showingId])

//     useEffect(() => {
//         fetch(`http://localhost:8080/showings/${showingId}/reserved_seats`)
//             .then((response) => response.json())
//             .then((data) => setReservedSeats(data))
//     }, [showingId])

//     const handleSeatClick = (seat: Seat) => {
//         if (
//             !reservedSeats.some(
//                 (reservedSeat) => reservedSeat.seatNumber === seat.seatNumber
//             )
//         ) {
//             if (
//                 selectedSeats.some(
//                     (selected) => selected.seatNumber === seat.seatNumber
//                 )
//             ) {
//                 setSelectedSeats(
//                     selectedSeats.filter(
//                         (selected) => selected.seatNumber !== seat.seatNumber
//                     )
//                 )
//             } else {
//                 setSelectedSeats([...selectedSeats, seat])
//             }
//         }
//     }

//     return (
//         <div>
//             <h1>Seats</h1>
//             <p>
//                 Movie: {showing?.movie.name} -- Time: {showing?.startTime} --
//                 Date: {showing?.showingDate}
//             </p>
//             <h5 style={{ color: 'purple' }}>
//                 ---------------------------------Screen
//                 here---------------------------------
//             </h5>
//             <div className="hall-container">
//                 <div className="hall-grid">
//                     {seats.map((seat, index) => (
//                         <div
//                             className={`seat ${
//                                 reservedSeats.some(
//                                     (reservedSeat) =>
//                                         reservedSeat.seatNumber ===
//                                         seat.seatNumber
//                                 )
//                                     ? 'reserved'
//                                     : ''
//                             } ${
//                                 selectedSeats.some(
//                                     (selected) =>
//                                         selected.seatNumber === seat.seatNumber
//                                 )
//                                     ? 'selected'
//                                     : ''
//                             }`}
//                             key={index}
//                             onClick={() => handleSeatClick(seat)}
//                         >
//                             <p>{seat.seatNumber}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

import Seat from '../../interfaces/seat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/hallforshowing.css'
import Showing from '../../interfaces/showing'

export default function HallForShowing() {
    const { showingId } = useParams()
    const [seats, setSeats] = useState<Seat[]>([])
    const [showing, setShowing] = useState<Showing>()
    const [reservedSeats, setReservedSeats] = useState<Seat[]>([])
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
    const [seatPrices, setSeatPrices] = useState<Map<number, number>>(new Map())

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}/seats`)
            .then((response) => response.json())
            .then((data) => setSeats(data))
    }, [showingId])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}`)
            .then((response) => response.json())
            .then((data) => setShowing(data))
    }, [showingId])

    useEffect(() => {
        fetch(`http://localhost:8080/showings/${showingId}/reserved_seats`)
            .then((response) => response.json())
            .then((data) => setReservedSeats(data))
    }, [showingId])

    const fetchSeatPrice = async (seatId: number) => {
        try {
            const response = await fetch(
                `http://localhost:8080/showings/${showingId}/seat/${seatId}/price`
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
                    setSeatPrices(new Map(seatPrices.set(seat.id, price)))
                    setSelectedSeats([...selectedSeats, seat])
                }
            }
        }
    }

    const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => {
            return total + (seatPrices.get(seat.id) || 0)
        }, 0)
    }

    return (
        <div>
            <div className="header-hallshowing">
                <h1>Seats</h1>
                {calculateTotalPrice() > 0 && (
                    <button className="paymentButton">Go to payment</button>
                )}
            </div>

            <div className="movie-info">
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
                    Total Price: <br></br>${calculateTotalPrice()}
                </p>
            </div>

            <h5 style={{ color: 'purple' }}>
                ---------------------------------Screen
                here---------------------------------
            </h5>
            <div className="hall-container">
                <div className="hall-grid">
                    {seats.map((seat, index) => (
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
                                        selected.seatNumber === seat.seatNumber
                                )
                                    ? 'selected'
                                    : ''
                            }`}
                            key={index}
                            onClick={() => handleSeatClick(seat)}
                        >
                            <p>{seat.seatNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
