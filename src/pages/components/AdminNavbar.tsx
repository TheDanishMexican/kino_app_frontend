import { NavLink } from "react-router-dom";


export default function AdminNavbar() {
  return (
    <nav>
      <p>You are currently signed in as {localStorage.getItem("username")}.</p>
        <ul>
            <li>
                { <NavLink to="/adminStaff">Staff</NavLink>}
            </li>
        </ul>
    </nav>
  );
}