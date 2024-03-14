import Movie from "./components/Movie";
import "./styling/mainpage.css"
export default function MainPage() {
  return (
    <>
      <h1>Welcome to the Front Page</h1>
      <p>The front page will display the latest news and movies.</p>
      <p>Movie example</p>
      <Movie title="Best movie" description="It's just the best" poster="https://img-cdn.sfanytime.com/COVERM/bb39136b-ac33-49a7-9aab-9f81010f5556_COVERM_DA.jpg?w=375&ar=0.692&fit=crop&fm=pjpg&s=b0343addd62fadeadd9ad7525c3319cd" showtimes={["12.30", "13.40","15.10", "16.40"]}/>
      
    </>
  );
}
