import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import "../styling/administrationpage.css";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const [value, setValue] = React.useState(0);
  //Hook for navigating to admin pages
  const navigate = useNavigate();
  return (
    <>
      <p>Logget ind som: {localStorage.getItem("username")}.</p>
      <div className="navbox">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
              console.log(newValue);
              if (newValue === "users") {
                navigate("/admin/users");
              }
              if (newValue === "cinemas") {
                navigate("/admin/cinemas");
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
            <BottomNavigationAction label="Halls" icon={<EventSeatIcon />} />
          </BottomNavigation>
        </Box>
      </div>
    </>
  );
}
