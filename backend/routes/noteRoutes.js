const express = require("express");
const { protect } = require("../middlewares/userAuth");
const mongoose = require("mongoose");
const Note = require("../models/Notes");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const router = express.Router();
// const Note = require("../models/Notes");
router.get("/:id/notes", async (req, res) => {
  const Notes = await Note.find({ user: req.params.id });

  res.status(200).json(Notes);
});
router.post("/:id/createNote", async (req, res) => {
  const { title, category, content } = req.body;
  const user = req.params.id;
  const note = await Note.create({ title, category, content, user });
  res.status(200).json(note);
});
router.get("/:id/one/:idtosee", async (req, res) => {
  const note = await Note.findById(req.params.idtosee);
  res.status(200).json(note);
});
router.put("/:id/updateNote/:idtoupdate", async (req, res) => {
  const { title, category, content } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.idtoupdate, req.body);
  const updateNote = await note.save();
  res.status(200).json(updateNote);
});
router.delete("/:id/deleteNote/:idtodelete", async (req, res) => {
  const note = Note.findById(req.params.idtodelete);
  if (note) {
    const deleteNote = await note.deleteOne();
    return res.status(200).json({ message: "note is deleted" });
  }
  res.status(200).json({ message: "note is not found" });
});
module.exports = router;
