// TODO - IMPLEMENT SECURITY.
// import { useAuth } from "./security/AuthProvider";
// import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";
import "./NavHeader.css";
import CameraIcon from "@mui/icons-material/Camera";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { LocalActivity, AccountCircle } from "@mui/icons-material";

export default function NavHeader() {
  // const auth = useAuth();
  return (
    <nav className="nav-header">
      <ul className="nav-header-ul">
        <li>
          <NavLink to="/">
            <CameraIcon />
            <p>Forside</p>
          </NavLink>
        </li>
        <li id="nav-film">
          <NavLink to="/film">
            <LocalMoviesIcon />
            <p>Film</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/biografer">
            <LocalActivity />
            <p>Biografer</p>
          </NavLink>
        </li>

        <li id="nav-signin">
          <NavLink to="/log-ind">
            <AccountCircle />
            <p>Opret Konto | Log Ind</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
