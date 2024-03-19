import AdminNavbar from "./components/AdminNavbar";
import "./styling/administrationpage.css";
export default function AdminPage() {
  return (
    <div>
      <AdminNavbar />
      <p>
        This page is meant for displaying the admin page. This page should ONLY
        be viewable by an admin user.
      </p>
    </div>
  );
}
