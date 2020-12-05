const{Router}=require("express");
const router= Router();
const{renderNoteForm, createNewNote,renderNotes, renderEditForm,updateNote,deleteNote}= require("../controllers/notes.controller.js");
const { route } = require("./index.routes.js");

const{isAuthenticated} =require("../helpers/auth");
//Nuevas notas 
router.get("/notes/add",isAuthenticated,renderNoteForm);

router.post("/notes/add",isAuthenticated, createNewNote);

//Obtener todas las notas
router.get("/notes",isAuthenticated, renderNotes);

//Editar notas
router.get("/notes/edit/:id",isAuthenticated, renderEditForm);

//Actualizar notas
router.put("/notes/edit/:id", updateNote);

//elimar notas
router.delete("/notes/delete/:id",deleteNote);

module.exports=router;