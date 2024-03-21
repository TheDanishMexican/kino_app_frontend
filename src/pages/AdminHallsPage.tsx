import AdminNavbar from "./components/AdminNavbar";
import AdminHallList from "./components/AdminHallList";
export default function AdminHallsPage() {
  return (
    <div>
      <AdminNavbar />
      <p>
        Imagine a list of halls here
        <AdminHallList />
      </p>
    </div>
  );
}
