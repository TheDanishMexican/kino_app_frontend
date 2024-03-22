import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import "../styling/administrationpage.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AdminNavbar() {
  const [value, setValue] = React.useState(0);
  //Hook for navigating to admin pages
  const navigate = useNavigate();
  return (
    <>
      <div className="navbox">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
              if (newValue === "users") {
                navigate("/admin/users");
              }
              if (newValue === "cinemas") {
                navigate("/admin/cinemas");
              }
              if (newValue === "showings") {
                navigate("/admin/showings");
              }
              if (newValue === "cinemas") {
                navigate("/admin/cinemas");
              }
              if (newValue === "movies") {
                navigate("/admin/movies");
              }
              if (newValue === "halls") {
                navigate("/admin/halls");
              }
            }}
          >
            <BottomNavigationAction
              label="Users"
              icon={<EngineeringIcon />}
              value="users"
            />
            <BottomNavigationAction
              label="Cinemas"
              icon={<CameraOutdoorIcon />}
              value="cinemas"
            />
            <BottomNavigationAction
              label="Showings"
              icon={<CameraOutdoorIcon />}
              value="showings"
            />
            <BottomNavigationAction
              label="Movies"
              icon={<MovieFilterIcon />}
              value="movies"
            />
          </BottomNavigation>
        </Box>
      </div>
    </>
  );
}
