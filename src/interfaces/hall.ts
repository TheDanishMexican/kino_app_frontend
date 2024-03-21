import Cinema from './cinema'
import Row from './row'
import Showing from './showing'

type HallProperty = string | number | Row[] | Showing[] | Cinema | undefined;

export default interface Hall {
    id?: number
    cinema?: Cinema
    cinemaId?: number
    rows?: Row[]
    showings?: Showing[]
    [key: string]: HallProperty
}
