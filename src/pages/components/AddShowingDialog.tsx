import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, MenuItem, TextField } from '@mui/material'
import { API_URL } from '../../settings'
import '../styling/addshowingdialog.css'
import Hall from '../../interfaces/hall'
import { Movie } from '../../services/apiFacade'
import { makeOptions } from '../../services/fetchUtils'

interface FormData {
    hallId: number
    startTime: string
    movie: Movie | null // Store the whole Movie object
    price: number
    showingDate: string
    is3D: boolean
}

export default function AddShowingDialog() {
    const [halls, setHalls] = useState<Hall[]>([])
    const [movies, setMovies] = useState<Movie[]>([])
    const [formData, setFormData] = useState<FormData>({
        hallId: 0,
        startTime: '',
        movie: null,
        price: 0,
        showingDate: '',
        is3D: false,
    })
    const option = makeOptions('POST', formData, undefined, true)

    async function addShowing() {
        const response = await fetch(`${API_URL}/showings`, option)
        if (response.ok) {
            console.log('Movie added successfully')
        } else {
            console.error('Failed to add movie')
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const moviesResponse = await fetch(`${API_URL}/movies`)
                const hallsResponse = await fetch(`${API_URL}/halls`)
                if (moviesResponse.ok && hallsResponse.ok) {
                    const moviesData = await moviesResponse.json()
                    const hallsData = await hallsResponse.json()
                    setMovies(moviesData)
                    setHalls(hallsData)
                } else {
                    console.error('Failed to fetch movies data')
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
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

    const handleMovieChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        const selectedMovieId = event.target.value as number
        const selectedMovie =
            movies.find((movie) => movie.id === selectedMovieId) ?? null
        setFormData({ ...formData, movie: selectedMovie })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Here you can perform any additional actions, like sending the data to the server
    }

    return (
        <form className="add-showing-form" onSubmit={handleSubmit}>
            <TextField
                select
                name="hallId"
                label="Hall"
                value={formData.hallId}
                onChange={handleChange}
                fullWidth
            >
                {halls.map((hall) => (
                    <MenuItem key={hall.id} value={hall.id}>
                        {hall.id}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                type="time"
                label="Start Time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                select
                name="movie"
                label="Movie"
                value={formData.movie ? formData.movie.id : ''}
                onChange={handleMovieChange}
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
                value={formData.showingDate}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                type="checkbox"
                name="is3D"
                label="3D"
                onChange={handleChange}
                fullWidth
            />
            <Button
                onClick={() => addShowing()}
                type="submit"
                variant="contained"
                color="primary"
            >
                Add Showing
            </Button>
        </form>
    )
}
