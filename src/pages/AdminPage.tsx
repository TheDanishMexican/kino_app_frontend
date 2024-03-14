import AdminNavbar from "./components/AdminNavbar";
export default function AdminPage() {
  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      <AdminNavbar />
      <p>
        This page is meant for displaying the admin page. This page should ONLY
        be viewable by an admin user.
      </p>
    </div>
  );
}
