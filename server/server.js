const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = process.env.port ?? 4000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("hey");
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );
    res.json(notes.rows);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/notes/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteNote = await pool.query("DELETE FROM notes WHERE id = $1", [
      id,
    ]);
    res.json(deleteNote);
  } catch (err) {
    console.error(err);
  }
});

app.put("/notes/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { noteTitle, noteBody } = req.body;
  console.log(req.body);
  try {
    const updateNote = await pool.query(
      "UPDATE notes SET title = $2, body = $3 WHERE id = $1",
      [id, noteTitle, noteBody]
    );
    res.json(updateNote);
  } catch (err) {
    console.error(err);
  }
});

app.post("/notes/new", async (req, res) => {
  const { noteTitle, noteBody } = req.body;

  try {
    const createNote = await pool.query(
      `INSERT INTO notes(title, body) VALUES($1, $2)`,
      [noteTitle, noteBody]
    );
    res.json(createNote);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
