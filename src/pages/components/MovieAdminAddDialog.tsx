import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Movie as APIMovie } from "../../services/apiFacade";

interface MovieAdminAddDialogProps {
  open: boolean;
  onSave: (movie: APIMovie) => void;
  onClose: () => void;
}

export default function MovieAdminAddDialog({
  open,
  onSave,
  onClose,
}: MovieAdminAddDialogProps) {
  const [name, setName] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [actors, setActors] = useState("");
  const [genres, setGenres] = useState("");

  const handleSaveClick = () => {
    const movie = {
      name,
      posterUrl,
      description,
      releaseDate,
      director,
      duration: parseInt(duration),
      actors: actors.split(",").map((actor) => actor.trim()),
      genres: genres.split(",").map((genre) => genre.trim()),
      created: new Date(),
      edited: new Date(),
    };

    onSave(movie);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
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
      <DialogTitle id="form-dialog-title">Add New Movie</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Movie Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="posterUrl"
              label="Poster URL"
              type="text"
              fullWidth
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="release-date">Release Date:</label>
            <input
              type="date"
              id="release-date"
              name="release-date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="director"
              label="Director"
              type="text"
              fullWidth
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="duration"
              label="Duration (minutes)"
              type="number"
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="actors"
              label="Actors (comma separated)"
              type="text"
              fullWidth
              value={actors}
              onChange={(e) => setActors(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="genres"
              label="Genres (comma separated)"
              type="text"
              fullWidth
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
