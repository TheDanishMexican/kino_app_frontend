import {
  Dialog as MuiDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { postCinema, getCinemas } from "../../services/apiFacade";
import Cinema from "../../interfaces/cinema";

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", // replace with your desired color
  },
}));

interface Cinema {
  name: string;
  [key: string]: unknown; // Add index signature with type 'unknown'
}

const initialUserState: Cinema = {
  name: "",
};

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Cinema) => void;
}

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Cinema) => void;
  onCinemaAdded: () => void;
}

export default function AdminCinemaListpostCinema({
  open,
  onClose,
  onCinemaAdded,
}: AdminUserListAddUserProps) {
  const [newUser, setNewUser] = useState<Cinema>(initialUserState);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (
      !newUser ||
      newUser.password !== newUser.confirmPassword
    ) {
      setErrorMessage(
        "Please fill all field"
      );
    } else {
      if (newUser) {
        postCinema(newUser)
          .then(() => {
            setNewUser(initialUserState); // Reset newUser state after successful addition
            onClose();
            // Fetch the users again after the new user has been added
            getCinemas()
              .then(() => {
                setNewUser(initialUserState); // Reset newUser state after successful addition
                onClose();
                onCinemaAdded(); // Fetch the users again in the parent component
              })
              .catch(() =>
                setErrorMessage("Error fetching users, is the server running?")
              );
          })
          .catch((error) => {
            // Display the error message
            setErrorMessage(`Failed to create user: ${error.message}`);
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
      <DialogTitle>Creating a new Cinema</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newUser) {
              setNewUser({
                ...newUser,
                name: e.target.value,
              });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        ></TextField>
      </DialogContent>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="location"
          type="text"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newUser) {
              setNewUser({
                ...newUser,
                location: e.target.value,
              });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        ></TextField>
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
