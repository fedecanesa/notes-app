const notesCtrl = { };

const Note = require('../models/Note')

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async function (req, res) {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    newNote.user = req.user.id;
    req.flash('success_msg' , 'Note added Succesfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async function(req , res) {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: "desc"});
    res.render('notes/all-notes' , { notes });
};

notesCtrl.renderEditForm = async function (req, res) {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
        req.flash('error_msg' , 'Not Authorizated');
        return req.redirect('/notes')
    }
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async function (req, res) {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg' , 'Note Updated Succesfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async function (req, res) {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg' , 'Note Deleted Succesfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;