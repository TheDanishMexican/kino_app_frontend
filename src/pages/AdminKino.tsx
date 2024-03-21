import AdminNavbar from './components/AdminNavbar';
import AdminCinemaList from './components/AdminCinemaList';
export default function AdminKino() {
    //Admins board for managing all CRUD for cinemas and halls

    return (
        <>
            <AdminNavbar />
            <div>
                <h1>Admin Kino</h1>
                <AdminCinemaList />
            </div>
            
        </>
    );
}