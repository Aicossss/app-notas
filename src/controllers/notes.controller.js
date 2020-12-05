const notesCtrl = {};
const Note = require("../models/notes");

notesCtrl.renderNoteForm = (req, res) => res.render("notes/new-note");

notesCtrl.createNewNote = async (req, res) => {
  // console.table(req.body);
  const { tittle, description } = req.body;
  //extraigo estas propiedades de req.body de new-note.hbs
  const newNote = new Note({ tittle: tittle, description: description });
  newNote.user = req.user.id;
  await newNote.save();
  console.log(req.user.id);

  req.flash("succes_msg", "Nota agregada con exito"); //nombre del mensaje, valor
  console.log(newNote);
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean();
  //el .lean lo convierte en json
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "No autorizado!");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
  console.log(note);
};

notesCtrl.updateNote = async (req, res) => {
  console.log(req.body);
  const { tittle, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { tittle, description });
  
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("succes_msg", "Nota eliminada con éxito");
  res.redirect("/notes");

  console.log(req.params.id); //de notes routes.js el id
};

module.exports = notesCtrl;
