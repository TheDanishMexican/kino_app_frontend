import Hall from './hall'

type CinemaProperty = string | number | Hall[] | undefined;

export default interface Cinema {
    id?: number
    name: string
    location: string
    halls: Hall[]
    [key: string]: CinemaProperty
}
