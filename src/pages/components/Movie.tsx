import "../styling/mainpage.css";

export default function Movie(movieProps: MovieProps) {
    const { title, description, poster, showtimes } = movieProps;
    return (
        <div className="movie">
            <img src={poster}/>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="time_container">
                    {showtimes.map((showtime, index) => (
                        <a key={index}>{showtime}</a>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

interface MovieProps {
    title: string;
    description: string;
    poster: string;
    showtimes: string[];
}