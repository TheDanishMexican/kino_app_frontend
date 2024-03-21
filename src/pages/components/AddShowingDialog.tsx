import { Button, MenuItem, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import Movie from '../../interfaces/movie'
import { API_URL } from '../../settings'

interface FormData {
    hallId: string
    startTime: string
    durationInMinutes: string
    movieId: string
    price: string
    showingDate: string
    is3dMovie: boolean
}

export default function AddShowingDialog() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [formData, setFormData] = useState<FormData>({
        hallId: '',
        startTime: '',
        durationInMinutes: '',
        movieId: '',
        price: '',
        showingDate: '',
        is3dMovie: false,
    })

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await fetch(`${API_URL}/movies`)
                if (response.ok) {
                    const data = await response.json()
                    setMovies(data)
                } else {
                    console.error(
                        'Failed to fetch movies:',
                        response.statusText
                    )
                }
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }

        getMovies()
    }, [])

    const handleChange = (
        e: ChangeEvent<
            | HTMLInputElement
            | HTMLTextAreaElement
            | { name?: string; value: unknown }
        >
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name as string]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Send formData to your backend API to create a new showing
        console.log('Form submitted:', formData)
        // Reset form data after submission if needed
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="hallId"
                label="Hall ID"
                value={formData.hallId}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="startTime"
                label="Start Time"
                value={formData.startTime}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="durationInMinutes"
                label="Duration (in minutes)"
                value={formData.durationInMinutes}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                select
                name="movieId"
                label="Movie"
                value={formData.movieId}
                onChange={handleChange}
                fullWidth
            >
                {movies.map((movie) => (
                    <MenuItem key={movie.id} value={movie.id}>
                        {movie.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="price"
                label="Price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                type="date"
                name="showingDate"
                label="Showing Date"
                value={formData.showingDate}
                onChange={handleChange}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Add Showing
            </Button>
        </form>
    )
}
