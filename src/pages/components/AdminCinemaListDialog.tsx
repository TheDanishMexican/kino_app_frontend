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
import { updateCinema, getCinemas } from "../../services/apiFacade";
import "../styling/adminuserspage.css";

// Styling

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", 
  },
}));

interface APICinema {
  name: string;
  [key: string]: unknown; // Add index signature with type 'unknown'
}

interface AdminUserListDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: APICinema) => void;
  user: APICinema;
  setCinemas: React.Dispatch<React.SetStateAction<APICinema[]>>;
}

export default function AdminCinemaListDialog({
  open,
  onClose,
  onSave,
  user,
  setCinemas,
}: AdminUserListDialogProps) {
  const [editingUser, setEditingUser] = useState<APICinema | null>(user);

  useEffect(() => {
    setEditingUser(user);
  }, [user]);

  const handleSave = () => {
    if (editingUser) {
      // Check if any of the fields are empty
      if (!editingUser.name) {
        alert("All field must be filled!");
      } else {
        // Call updateCinema with the editingUser object
        updateCinema({ ...editingUser })
          .then(() => {
            // Call onSave after updateCinema has completed
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
          label="Email Address"
          type="email"
          fullWidth
          value={editingUser?.email || ""}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              name: e.target.value,
            })
          }
        />
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
