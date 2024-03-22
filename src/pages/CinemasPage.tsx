import Cinema from "../interfaces/cinema";
import { useEffect, useState } from "react";
import "./styling/cinemaspage.css";
import { Link } from "react-router-dom";
import { API_URL } from "../settings";
import { CircularProgress } from "@mui/material";

export default function CinemasPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/cinemas`)
      .then((response) => response.json())
      .then((data) => setCinemas(data));
  }, []);

  if (cinemas.length === 0) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Vælg en biograf:</h1>
        <ul className="cinemas-container" style={{ listStyle: "none" }}>
          {cinemas.map((cinema, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/cinemas/${cinema.id}/showings`}
              key={index}
            >
              <li className="cinema-card" key={index}>
                <h3>{cinema.name}</h3>
                <p>{cinema.location}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
