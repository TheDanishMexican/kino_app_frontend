import Movie from "./components/MoviesPage";
import "./styling/mainpage.css"
export default function MainPage() {
  return (
    <>
      <h1>Featured Movies🍿🎬</h1>
     
      <div className="movie-grid">
      <Movie/>
      </div>
      {/* <Movie title="Best movie" description="It's just the best" poster="https://img-cdn.sfanytime.com/COVERM/bb39136b-ac33-49a7-9aab-9f81010f5556_COVERM_DA.jpg?w=375&ar=0.692&fit=crop&fm=pjpg&s=b0343addd62fadeadd9ad7525c3319cd"/>
       */}
    </>
  );
}
