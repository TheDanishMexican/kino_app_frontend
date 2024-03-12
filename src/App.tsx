import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MoviesPage from "./pages/MoviesPage";
import CinemasPage from "./pages/CinemasPage";
import SigninPage from "./pages/SigninPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/film" element={<MoviesPage />} />
        <Route path="/biografer" element={<CinemasPage />} />
        <Route path="/log-ind" element={<SigninPage />} />
        <Route path="/opret-konto" element={<CreateAccountPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
