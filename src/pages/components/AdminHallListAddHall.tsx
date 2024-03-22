import {
  Dialog as MuiDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { postHall, getHalls, getRows, getCinemas } from "../../services/apiFacade";
import Hall from "../../interfaces/hall";
import React from "react";
import Row from "../../interfaces/row";
import Cinema from "../../interfaces/cinema";

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", // replace with your desired color
  },
}));

const initialHallState: Hall = {
  cinema: undefined,
  rows: [],
  showings: [],
};

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Hall) => void;
}

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Hall) => void;
  onHallAdded: () => void;
}

export default function AdminrowListpostHall({
  open,
  onClose,
  onHallAdded,
}: AdminUserListAddUserProps) {
  const [newHall, setNewHall] = useState<Hall>(initialHallState);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    console.log(newHall);
    if (
      !newHall
    ) {
      setErrorMessage(
        "Please fill all fields"
      );
    } else {
      if (newHall) {
        postHall(newHall)
          .then(() => {
            setNewHall(initialHallState); // Reset newHall state after successful addition
            onClose();
            // Fetch the users again after the new user has been added
            getHalls()
              .then(() => {
                setNewHall(initialHallState); // Reset newHall state after successful addition
                onClose();
                onHallAdded(); // Fetch the users again in the parent component
              })
              .catch(() =>
                setErrorMessage("Error fetching halls, is the server running?")
              );
          })
          .catch((error) => {
            // Display the error message
            setErrorMessage(`Failed to create hall: ${error.message}`);
          });
      }
    }
  };
  const [rowList, setRowList] = React.useState([] as Row[]);
  useEffect(() => {
    getRows().then((rowList) => {
      setRowList(rowList);
    });
  }, []);
  const [cinemaList, setCinemaList] = React.useState([] as Cinema[]);
  useEffect(() => {
    getCinemas().then((list) => {
      setCinemaList(list);
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      id="edit-user-dialog"
      fullWidth={true}
      sx={{
        "& .MuiDialog-paper": {
          background:
            "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%)",
          color: "white",
          boxShadow: "0px 0px 50px rgba(255, 0, 132, 0.3)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 0, 132, 1)",
        },
        "& .MuiFormLabel-root": {
          color: "white", // replace with your desired color
        },
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputBase-input": {
          color: "white", // replace with your desired color
        },
        "& .MuiInputBase-input:not(.Mui-focused)": {
          color: "white", // replace with your desired color
        },
        "& .MuiCheckbox-root:not(.Mui-checked)": {
          color: "gray", // replace with your desired color
        },
      }}
    >
      <DialogTitle>Creating a new Hall</DialogTitle>


      <DialogContent>
      <FormLabel>Cinemas</FormLabel>
      <FormGroup>
            {cinemaList.map((cinema) => (
              <FormControlLabel
                key={cinema.name}
                control={
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newCinema = (newHall?.cinema || {});
                      if (e.target.checked) {
                        newCinema = { ...cinema } ;
                      }
                      setNewHall({
                      ...newHall,
                      cinema: newCinema,
                      cinemaId: cinema.id,
                    } as Hall);
                    }}
                  />
                }
                label={cinema.name}
              />
            ))}
          </FormGroup>
          <FormControl fullWidth>
          <FormLabel>Rows</FormLabel>
          <FormGroup>
            {rowList.map((row) => (
              <FormControlLabel
                key={row.id}
                control={
                  <Checkbox
                    checked={newHall?.rows?.includes(row) || false}
                    onChange={(e) => {
                      let newRows = [...(newHall?.rows || [])];
                      if (e.target.checked) {
                        newRows.push(row);
                      } else {
                        newRows = newRows.filter((r) => r !== row);
                      }
                      setNewHall({
                        ...newHall,
                        roles: newRows,
                      });
                    }}
                  />
                }
                label={row.id}
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      {errorMessage && (
        <Typography
          variant="body1"
          align="center"
          color="error"
          style={{ marginTop: "10px" }}
        >
          {errorMessage}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="outlined" color="primary" onClick={handleSave}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
