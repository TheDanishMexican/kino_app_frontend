import Hall from './hall'

export default interface Cinema {
    id?: number
    name: string
    location: string
    halls: Hall[]
}
