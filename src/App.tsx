// ESSENTIAL
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// PAGES
import MoviesPage from './pages/MoviesPage'
import CinemasPage from './pages/CinemasPage'
import AdminPage from './pages/AdminPage'
import StaffPage from './pages/StaffPage'
import AdminStaffPage from './pages/AdminStaffPage'
// SECURITY / AUTH
import Login from './security/Login'
import CreateAccountPage from './pages/CreateAccountPage'
import RequireAuth from './security/RequireAuth'
import ReservationsPage from './pages/ReservationsPage'
import AccountPage from './pages/AccountPage'
import ShowingsOverview from './pages/components/ShowingsOverview'
import HallForShowing from './pages/components/HallForShowing'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/biografer" element={<CinemasPage />} />
                <Route path="/log-ind" element={<Login />} />
                <Route path="/opret-konto" element={<CreateAccountPage />} />
                <Route
                    path="/cinemas/:cinemaId/showings"
                    element={
                        <RequireAuth roles={['USER']}>
                            <ShowingsOverview />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/showing/:showingId/seats"
                    element={
                        <RequireAuth roles={['USER']}>
                            <HallForShowing />
                        </RequireAuth>
                    }
                />
                {/* STAFF PAGE */}
                <Route
                    path="/ordreoversigt"
                    element={
                        <RequireAuth roles={['ADMIN', 'STAFF']}>
                            <StaffPage />
                        </RequireAuth>
                    }
                />
                {/* ADMIN PAGE */}
                <Route
                    path="/administrator"
                    element={
                        <RequireAuth roles={['ADMIN']}>
                            <AdminPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/adminStaff"
                    element={
                        <RequireAuth roles={['ADMIN']}>
                            <AdminStaffPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="*"
                    element={<h1>404 - Siden blev ikke fundet</h1>}
                />
                <Route
                    path="/reservationer"
                    element={
                        <RequireAuth roles={['USER']}>
                            <ReservationsPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/min-konto"
                    element={
                        <RequireAuth roles={['USER', 'ADMIN', 'STAFF']}>
                            <AccountPage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Layout>
    )
}

export default App
