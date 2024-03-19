import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { updateUser, getUsers } from "../../services/apiFacade";
import "../styling/adminuserspage.css";

// Styling

const Dialog = styled(MuiDialog)(({ theme }) => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", // replace with your desired color
  },
}));

interface Role {
  roleName: string;
}

interface APIUser {
  username: string;
  email: string;
  roles: Array<Role>;
  created: Date | string;
  edited: Date | string;
  [key: string]: unknown; // Add index signature with type 'unknown'
}

interface AdminUserListDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: APIUser) => void;
  user: APIUser;
  setUsers: React.Dispatch<React.SetStateAction<APIUser[]>>;
}

export default function AdminUserListDialog({
  open,
  onClose,
  onSave,
  user,
  setUsers,
}: AdminUserListDialogProps) {
  const [editingUser, setEditingUser] = useState<APIUser | null>(user);

  useEffect(() => {
    setEditingUser(user);
  }, [user]);

  const handleSave = () => {
    if (editingUser) {
      // Check if any of the fields are empty
      if (!editingUser.email || !editingUser.roles.length) {
        alert("All fields must be filled!");
      } else {
        // Call updateUser with the editingUser object
        const roles =
          editingUser?.roles.map((role: Role) => role.roleName) || [];
        updateUser({ ...editingUser, roles })
          .then(() => {
            // Call onSave after updateUser has completed
            onSave(editingUser);
            // Fetch the list of users
            getUsers().then((users) => {
              // Update the state with the new list of users
              setUsers(users);
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
        Editing user {user && user.username ? user.username : "undefined"}
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
              email: e.target.value,
              roles: editingUser?.roles || [],
              username: editingUser?.username || "",
              created: editingUser?.created || new Date(),
              edited: new Date(),
            })
          }
        />
        <FormControl fullWidth>
          <FormLabel>Roles</FormLabel>
          <FormGroup>
            {["USER", "STAFF", "ADMIN"].map((role) => (
              <FormControlLabel
                key={role}
                control={
                  <Checkbox
                    checked={
                      editingUser?.roles.some((r) => r.roleName === role) ||
                      false
                    }
                    onChange={(e) => {
                      let newRoles = [...(editingUser?.roles || [])];
                      if (e.target.checked) {
                        newRoles.push({ roleName: role });
                      } else {
                        newRoles = newRoles.filter((r) => r.roleName !== role);
                      }
                      setEditingUser({
                        ...editingUser,
                        roles: newRoles,
                        username: editingUser?.username || "",
                        email: editingUser?.email || "",
                        created: editingUser?.created || new Date(),
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
