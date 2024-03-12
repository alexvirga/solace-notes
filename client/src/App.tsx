import { useState, useEffect } from "react";
import Note from "./Components/Note";
import NewNote from "./Components/NewNote";
import { Box, Typography } from "@mui/material";
import "./App.css";

interface Notes {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [notes, setNotes] = useState<Notes[]>();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:4000/notes");
      const notesList = await response.json();
      setNotes(notesList);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/notes/delete/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <NewNote getNotes={getData} />
      <Box className="notes-container">
        <Typography variant="h2" textAlign={"left"}>
          {" "}
          All Notes
        </Typography>
        <Box className="notes-grid">
          {notes &&
            notes.map((note) => {
              return (
                <div>
                  <Note
                    note={note}
                    deleteNote={deleteNote}
                    getNotes={getData}
                  />
                </div>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
