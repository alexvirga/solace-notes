import { useState } from "react";
import { Button, Box, FormLabel, TextField, Typography } from "@mui/material";

interface Props {
  getNotes: () => void;
}
const NewNote = ({ getNotes }: Props) => {
  const [newTitle, setNewTitle] = useState<string>();
  const [newBody, setNewBody] = useState<string>();
  const [bodyError, setBodyError] = useState("");

  const createNote = async () => {
    try {
      const response = await fetch(`http://localhost:4000/notes/new`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ noteBody: newBody, noteTitle: newTitle }),
      });
      console.log(response);
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNote();
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBody = event.target.value;
    setNewBody(newBody);
    if (newBody.length < 20 || newBody.length > 300) {
      setBodyError("Body must be between 20 and 300 characters.");
    } else {
      setBodyError("");
    }
  };

  return (
    <Box className="new-note-container">
      <Typography variant="h2">New Note</Typography>
      <Box className="new-note-form"></Box>
      <form onSubmit={handleSubmit} className={"new-note-form"}>
        <FormLabel> Title</FormLabel>
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <FormLabel> Body</FormLabel>
        <TextField
          value={newBody}
          rows={4}
          multiline
          onChange={handleBodyChange}
          error={!!bodyError}
          helperText={bodyError}
        />
        <Button type="submit" disabled={!!bodyError}>
          {" "}
          Create New Note{" "}
        </Button>
      </form>
    </Box>
  );
};

export default NewNote;
