export default function Movie(movieProps: MovieProps) {
    const { title, description, poster, showtimes } = movieProps;
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <ul>
                {showtimes.map((showtime, index) => (
                    <li key={index}>{showtime}</li>
                ))}
            </ul>
            <img src={poster}/>
            
        </>
    );
}

interface MovieProps {
    title: string;
    description: string;
    poster: string;
    showtimes: string[];
}