import AdminNavbar from './components/AdminNavbar';
export default function AdminKino() {
    //Admins board for managing all CRUD for cinemas and halls

    return (
        <>
            <AdminNavbar />
            <div>
                <h1>Admin Kino</h1>
                <p>Her kan du oprette, redigere og slette biografer og sale</p>
            </div>
            
        </>
    );
}