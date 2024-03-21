import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { putCinema, getCinemas } from "../../services/apiFacade"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Cinema from "../../interfaces/cinema";
import React from "react";
import "../styling/adminuserspage.css";

// Styling

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", 
  },
}));

interface AdminUserListDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Cinema) => void;
  user: Cinema;
  setCinemas: React.Dispatch<React.SetStateAction<Cinema[]>>;
}



export default function AdminCinemaListDialog({
  open,
  onClose,
  onSave,
  user,
  setCinemas,
}: AdminUserListDialogProps) {
  const [editingUser, setEditingUser] = useState<Cinema | null>(user);

  useEffect(() => {
    setEditingUser(user);
  }, [user]);

  const handleSave = () => {
    if (editingUser) {
      // Check if any of the fields are empty
      if (!editingUser.name) {
        alert("All field must be filled!");
      } else {
        // Call putCinema with the editingUser object
        putCinema({ ...editingUser })
          .then(() => {
            // Call onSave after putCinema has completed
            onSave(editingUser);
            // Fetch the list of users
            getCinemas().then((users) => {
              // Update the state with the new list of users
              setCinemas(users);
            });
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error updating user:", error);
          });
      }
    }
  };
  
  const [halls, setHalls] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setHalls(event.target.value as string);
  };

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
      <DialogTitle>
        Editing cinema {user && user.name ? user.name : "undefined"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          value={editingUser?.name || ""}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              name: e.target.value,
            } as Cinema)
          }
        />
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="location"
          type="text"
          fullWidth
          value={editingUser?.name || ""}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              location: e.target.value
            } as Cinema)
          }
        />
      </DialogContent>
      <DialogContent>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={halls}
          label="Hall"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
