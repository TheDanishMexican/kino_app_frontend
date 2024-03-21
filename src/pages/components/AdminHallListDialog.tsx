import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  FormGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { getCinemas, getHalls, putHall} from "../../services/apiFacade"
import React from "react";
import "../styling/adminuserspage.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cinema from "../../interfaces/cinema";
import Hall from "../../interfaces/hall";


// Styling

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", 
  },
}));

interface AdmincinemaDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Hall) => void;
  user: Hall;
  setHalls: React.Dispatch<React.SetStateAction<Hall[]>>;
}



export default function AdmincinemaDialog({
  open,
  onClose,
  onSave,
  user,
  setHalls,
}: AdmincinemaDialogProps) {
  const [editingHall, setEditingHall] = useState<Hall | null>(user);

  useEffect(() => {
    setEditingHall(user);
  }, [user]);

  const handleSave = () => {
    if (editingHall) {
      // Check if any of the fields are empty
      if (!editingHall.id) {
        alert("All field must be filled!");
      } else {
        // Call putHall with the editingHall object
        putHall({ ...editingHall })
          .then(() => {
            // Call onSave after putHall has completed
            onSave(editingHall);
            // Fetch the list of halls
            getHalls().then((halls) => {
              // Update the state with the new list of users
              setHalls(halls);
            });
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error updating user:", error);
          });
      }
    }
  };
  

  const [cinemaList, setCinemaList] = React.useState([] as Cinema[]);
  useEffect(() => {
    if (!editingHall) {
      return;
    }
    getCinemas().then((list) => {
      setCinemaList(list);
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
        Editing hall {user && user.id ? user.id : "undefined"}
      </DialogTitle>
      <DialogContent>
      <FormGroup>
      {cinemaList.map((cinema) => (
              <FormControlLabel
                key={cinema.id}
                control={
                  <Checkbox
                    checked={
                      editingHall?.cinema?.id == cinema.id ||
                      false
                    }
                    onChange={(e) => {
                      let newCinema = (editingHall?.cinema || {});
                      if (e.target.checked) {
                        newCinema = { ...cinema };
                      } 
                      setEditingHall({
                        ...editingHall,
                        cinema: newCinema,
                        cinemaId: cinema.id
                      } as Hall);
                    }}
                  />
                }
                label={cinema.id}
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