import Cinema from './cinema'
import Row from './row'
import Showing from './showing'

export default interface Hall {
    id: number
    cinema?: Cinema
    rows?: Row[]
    showings?: Showing[]
}
