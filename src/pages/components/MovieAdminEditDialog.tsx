import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Movie as APIMovie } from "../../services/apiFacade";

interface MovieEditDialogProps {
  open: boolean;
  movie: APIMovie | null;
  onSave: (movie: APIMovie) => void;
  onClose: () => void;
}

export default function MovieEditDialog({
  open,
  movie,
  onSave,
  onClose,
}: MovieEditDialogProps) {
  const [editedMovie, setEditedMovie] = useState<APIMovie | null>(null);

  useEffect(() => {
    setEditedMovie(movie);
  }, [movie]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedMovie) {
      setEditedMovie({ ...editedMovie, [name]: value });
    }
  };

  const handleSave = () => {
    if (editedMovie) {
      onSave(editedMovie);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Movie Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={editedMovie?.name || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="duration"
          label="Duration"
          type="number"
          fullWidth
          variant="outlined"
          name="duration"
          value={editedMovie?.duration || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={editedMovie?.description || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
