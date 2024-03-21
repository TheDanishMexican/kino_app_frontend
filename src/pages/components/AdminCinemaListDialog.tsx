import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  FormGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { putCinema, getCinemas, getHalls } from "../../services/apiFacade"
import Cinema from "../../interfaces/cinema";
import Hall from "../../interfaces/hall";
import React from "react";
import "../styling/adminuserspage.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
  const [editingCinema, setEditingCinema] = useState<Cinema | null>(user);

  useEffect(() => {
    setEditingCinema(user);
  }, [user]);

  const handleSave = () => {
    if (editingCinema) {
      // Check if any of the fields are empty
      if (!editingCinema.name) {
        alert("All field must be filled!");
      } else {
        // Call putCinema with the editingCinema object
        putCinema({ ...editingCinema })
          .then(() => {
            // Call onSave after putCinema has completed
            onSave(editingCinema);
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
  
  // const [halls, setHalls] = React.useState('');
  const [hallList, setHallList] = React.useState([] as Hall[]);
  useEffect(() => {
    getHalls().then((hallList) => {
      setHallList(hallList);
    });
  }, []);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setHalls(event.target.value as string);
  // };

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
          value={editingCinema?.name || ""}
          onChange={(e) =>
            setEditingCinema({
              ...editingCinema,
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
          value={editingCinema?.name || ""}
          onChange={(e) =>
            setEditingCinema({
              ...editingCinema,
              location: e.target.value
            } as Cinema)
          }
        />
      </DialogContent>
      <DialogContent>
      <FormGroup>
            {hallList.map((hall) => (
              <FormControlLabel
                key={hall.id}
                control={
                  <Checkbox
                    checked={
                      editingCinema?.id == hall.id ||
                      false
                    }
                    onChange={(e) => {
                      let newhalls = [...(editingCinema?.halls || [])];
                      if (e.target.checked) {
                        newhalls.push({ id: hall.id });
                      } else {
                        newhalls = newhalls.filter((r) => r.id !== hall.id);
                      }
                      setEditingCinema({
                        ...editingCinema,
                        halls: newhalls
                      } as Cinema);
                    }}
                  />
                }
                label={hall.id}
              />
            ))}
          </FormGroup>
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
)
}