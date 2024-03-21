import {
  Dialog as MuiDialog,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  styled,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { createUser, getUsers } from "../../services/apiFacade";

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", // replace with your desired color
  },
}));

interface APIUser {
  email: string;
  confirmPassword: string;
  username: string;
  password: string;
  roles?: string[];
  [key: string]: unknown; // Add index signature with type 'unknown'
}

const initialUserState: APIUser = {
  email: "",
  confirmPassword: "",
  username: "",
  password: "",
  roles: [],
};

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: APIUser) => void;
}

interface AdminUserListAddUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: APIUser) => void;
  onUserAdded: () => void;
}

export default function AdminUsersListAddUser({
  open,
  onClose,
  onUserAdded,
}: AdminUserListAddUserProps) {
  const [newUser, setNewUser] = useState<APIUser>(initialUserState);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (
      !newUser ||
      !newUser.username?.trim() ||
      !newUser.password?.trim() ||
      !newUser.email?.trim() ||
      !newUser.confirmPassword?.trim() ||
      newUser.password !== newUser.confirmPassword
    ) {
      setErrorMessage(
        "Please fill all fields correctly and make sure passwords match."
      );
    } else {
      if (newUser) {
        createUser(newUser)
          .then(() => {
            setNewUser(initialUserState); // Reset newUser state after successful addition
            onClose();
            // Fetch the users again after the new user has been added
            getUsers()
              .then(() => {
                setNewUser(initialUserState); // Reset newUser state after successful addition
                onClose();
                onUserAdded(); // Fetch the users again in the parent component
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
      <DialogTitle>Creating a new user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newUser) {
              setNewUser({
                ...newUser,
                username: e.target.value,
                roles: newUser?.roles || [],
                email: newUser?.email || "",
                password: newUser?.password || "",
                confirmPassword: newUser?.confirmPassword || "",
              });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(e) =>
            setNewUser({
              ...newUser,
              email: e.target.value,
              roles: newUser?.roles || [],
              username: newUser?.username || "",
              password: newUser?.password || "",
              confirmPassword: newUser?.confirmPassword || "",
            })
          }
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newUser) {
              setNewUser({
                ...newUser,
                password: e.target.value,
                roles: newUser.roles || [],
                email: newUser.email,
                username: newUser.username,
                confirmPassword: newUser.confirmPassword,
              });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newUser) {
              setNewUser({
                ...newUser,
                confirmPassword: e.target.value,
                roles: newUser.roles || [],
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
              });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        ></TextField>
        <FormControl fullWidth>
          <FormLabel>Roles</FormLabel>
          <FormGroup>
            {["USER", "STAFF", "ADMIN"].map((role) => (
              <FormControlLabel
                key={role}
                control={
                  <Checkbox
                    checked={newUser?.roles?.includes(role) || false}
                    onChange={(e) => {
                      let newRoles = [...(newUser?.roles || [])];
                      if (e.target.checked) {
                        newRoles.push(role);
                      } else {
                        newRoles = newRoles.filter((r) => r !== role);
                      }
                      setNewUser({
                        ...newUser,
                        roles: newRoles,
                        username: newUser?.username || "",
                        email: newUser?.email || "",
                        created: newUser?.created || new Date(),
                        edited: new Date(),
                      });
                    }}
                  />
                }
                label={role}
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
