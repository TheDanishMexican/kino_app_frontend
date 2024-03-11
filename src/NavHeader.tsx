// TODO - IMPLEMENT SECURITY.
// import { useAuth } from "./security/AuthProvider";
// import AuthStatus from "./security/AuthStatus";
import { NavLink, useLocation } from "react-router-dom";
import "./NavHeader.css";
import CameraIcon from "@mui/icons-material/Camera";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { LocalActivity, AccountCircle, LocationOff } from "@mui/icons-material";

export default function NavHeader() {
  const location = useLocation();
  // const auth = useAuth();
  return (
    <nav className="nav-header">
      <ul className="nav-header-ul">
        <li
          id="nav-header-logo"
          className={location.pathname == "/" ? "active-header" : ""}
        >
          <NavLink to="/">
            <CameraIcon />
          </NavLink>
        </li>
        <li
          id="nav-film"
          className={location.pathname == "/film" ? "active-header" : ""}
        >
          <NavLink to="/film">
            <LocalMoviesIcon />
            <p>Film</p>
          </NavLink>
        </li>
        <li
          className={location.pathname == "/biografer" ? "active-header" : ""}
        >
          <NavLink to="/biografer">
            <LocalActivity />
            <p>Biografer</p>
          </NavLink>
        </li>

        <li
          id="nav-signin"
          className={
            location.pathname == "/log-ind" ||
            location.pathname == "/opret-konto"
              ? "active-header"
              : ""
          }
        >
          <NavLink to="/log-ind">
            <AccountCircle />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
