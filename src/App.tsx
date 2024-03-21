// ESSENTIAL
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// PAGES
import MoviesPage from "./pages/MoviesPage";
import CinemasPage from "./pages/CinemasPage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import AdminUsersPage from "./pages/AdminUsersPage";
// SECURITY / AUTH
import Login from "./security/Login";
import CreateAccountPage from "./pages/CreateAccountPage";
import RequireAuth from "./security/RequireAuth";
import ReservationsPage from "./pages/ReservationsPage";
import AccountPage from "./pages/AccountPage";
import ShowingsOverview from "./pages/components/ShowingsOverview";
import HallForShowing from "./pages/components/HallForShowing";
import MovieDetailView from "./pages/components/MovieDetailView";
import ReservationOverview from "./pages/components/ReservationOverview";
import SuccesPage from "./pages/SuccesPage";
import AdminKino from "./pages/AdminKino";
import MovieAdminView from "./pages/components/MovieAdminView";
import AdminShowingsPage from "./pages/AdminShowingsPage";
import AdminHallsPage from "./pages/AdminHallsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailView />} />
        <Route path="/biografer" element={<CinemasPage />} />
        <Route path="/log-ind" element={<Login />} />
        <Route path="/opret-konto" element={<CreateAccountPage />} />
        <Route
          path="/admin/movies"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <MovieAdminView />
            </RequireAuth>
          }
        />

        <Route
          path="/cinemas/:cinemaId/showings"
          element={<ShowingsOverview />}
        />
        <Route
          path="/showing/:showingId/seats"
          element={
            <RequireAuth roles={["USER"]}>
              <HallForShowing />
            </RequireAuth>
          }
        />
        <Route
          path="/reservationOverview"
          element={
            <RequireAuth roles={["USER"]}>
              <ReservationOverview />
            </RequireAuth>
          }
        />
        <Route
          path="/succesPage"
          element={
            <RequireAuth roles={["USER"]}>
              <SuccesPage />
            </RequireAuth>
          }
        />
        {/* STAFF PAGE */}
        <Route
          path="/ordreoversigt"
          element={
            <RequireAuth roles={["ADMIN", "STAFF"]}>
              <StaffPage />
            </RequireAuth>
          }
        />
        {/* ADMIN PAGE */}
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminPage />
            </RequireAuth>
          }
        />
        <Route
          path="admin/users"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminUsersPage />
            </RequireAuth>
          }
        />
        <Route
          path="admin/cinemas"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminKino />
            </RequireAuth>
          }
        />
        <Route
          path="admin/halls"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminHallsPage />
            </RequireAuth>
          }
        />
        <Route
          path="admin/showings"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminShowingsPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<h1>404 - Siden blev ikke fundet</h1>} />
        <Route
          path="/reservationer"
          element={
            <RequireAuth roles={["USER"]}>
              <ReservationsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/min-konto"
          element={
            <RequireAuth roles={["USER", "ADMIN", "STAFF"]}>
              <AccountPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
