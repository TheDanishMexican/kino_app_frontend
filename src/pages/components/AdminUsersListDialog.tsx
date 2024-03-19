import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateUser, getUsers } from "../../services/apiFacade";

interface Role {
  roleName: string;
}

interface APIUser {
  username: string;
  email: string;
  roles: Role[];
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
    <Dialog open={open} onClose={onClose} id="edit-user-dialog">
      <DialogTitle>Edit User</DialogTitle>
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
              username: editingUser?.username || "", // Add default empty string value for username
            })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={editingUser?.roles.map((role: Role) => role.roleName) || []}
            onChange={(e: SelectChangeEvent<string[]>) =>
              setEditingUser({
                ...editingUser,
                email: editingUser?.email || "",
                roles: (e.target.value as string[]).map((roleName: string) => ({
                  roleName,
                })),
                username: editingUser?.username || "", // Add default empty string value for username
              })
            }
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {["USER", "STAFF", "ADMIN"].map((role) => (
              <MenuItem key={role} value={role}>
                <Checkbox
                  checked={
                    editingUser?.roles.some((r) => r.roleName === role) || false
                  }
                />
                {role}
              </MenuItem>
            ))}
          </Select>
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
