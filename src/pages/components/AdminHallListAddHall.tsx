import {
  Dialog as MuiDialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { postHall, getHalls, getRows, getCinemas } from "../../services/apiFacade";
import Hall from "../../interfaces/hall";
import React from "react";
import Row from "../../interfaces/row";

const Dialog = styled(MuiDialog)(() => ({
  ".MuiPaper-root": {
    backgroundColor:
      "linear-gradient(207deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 57, 1) 35%, rgba(42, 9, 36, 1) 100%);",
    color: "white", // replace with your desired color
  },
}));

const initialHallState: Hall = {
  id: 0,
  name: "",
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

export default function AdminHallListpostHall({
  open,
  onClose,
  onHallAdded,
}: AdminUserListAddUserProps) {
  const [newHall, setNewHall] = useState<Hall>(initialHallState);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (
      !newHall ||
      newHall.password !== newHall.confirmPassword
    ) {
      setErrorMessage(
        "Please fill all field"
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
  const [hallList, setHallList] = React.useState([] as Hall[]);
  useEffect(() => {
    getHalls().then((hallList) => {
      setHallList(hallList);
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
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (newHall) {
              setNewHall({
                ...newHall,
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
            if (newHall) {
              setNewHall({
                ...newHall,
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
      <DialogContent>
      <FormGroup>
            {hallList.map((hall) => (
              <FormControlLabel
                key={hall.id}
                control={
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newhalls = [...(newHall?.halls || [])];
                      if (e.target.checked) {
                        newhalls.push({ id: hall.id });
                      } else {
                        newhalls = newhalls.filter((r) => r.id !== hall.id);
                      }
                      setNewHall({
                      ...newHall,
                      halls: newhalls,
                    });
                    }}
                  />
                }
                label={hall.id}
              />
            ))}
          </FormGroup>
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
