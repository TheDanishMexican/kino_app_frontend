import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { AccountCircle } from "@mui/icons-material";

export default function AuthStatus() {
  const auth = useAuth();

  if (!auth.isLoggedIn()) {
    return (
      <li>
        <NavLink to="/log-ind">
          <AccountCircle />
        </NavLink>
      </li>
    );
  } else {
    return (
      <li>
        <NavLink to="/log-ud">
          <AccountCircle />
        </NavLink>
      </li>
    );
  }
}
