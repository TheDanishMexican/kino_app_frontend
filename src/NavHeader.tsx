import { useAuth } from "./security/AuthProvider";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink, useLocation } from "react-router-dom";
import "./NavHeader.css";
import CameraIcon from "@mui/icons-material/Camera";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import { LocalActivity, AccountCircle } from "@mui/icons-material";

export default function NavHeader() {
  const location = useLocation();
  const auth = useAuth();
  const handleSignout = () => {
    auth.signOut();
  };
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
            <CameraIndoorIcon />
            <p>Biografer</p>
          </NavLink>
        </li>
        {auth.isLoggedInAs(["USER"]) && (
          <li
            id="nav-reservations"
            className={
              location.pathname == "/reservationer" ? "active-header" : ""
            }
          >
            <NavLink to="/reservationer">
              <LocalActivity />
              <p>Billetter</p>
            </NavLink>
          </li>
        )}

        {auth.isLoggedInAs(["USER", "ADMIN", "STAFF"]) && (
          <>
            <li id="nav-account">
              <NavLink to="/min-konto">
                <AccountCircle />
                <p>Min konto</p>
              </NavLink>
            </li>
          </>
        )}
        {auth.isLoggedInAs(["STAFF", "ADMIN"]) && (
          <li
            id="nav-orders"
            className={
              location.pathname == "/ordreoversigt" ? "active-header" : ""
            }
          >
            <NavLink to="/ordreoversigt">
              <PointOfSaleIcon />
              <p>Ordrer</p>
            </NavLink>
          </li>
        )}

        {auth.isLoggedInAs(["ADMIN"]) && (
          <li
            id="nav-admin"
            className={
              location.pathname == "/administrator" ? "active-header" : ""
            }
          >
            <NavLink to="/administrator">
              <AdminPanelSettingsIcon />
              <p>Administrator</p>
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn() && (
          <>
            <li id="nav-signout">
              <NavLink to="/" onClick={handleSignout}>
                <ExitToAppIcon />
                <p>Log ud</p>
              </NavLink>
            </li>
          </>
        )}
        {!auth.isLoggedIn() && (
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
              <p>Log ind</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
