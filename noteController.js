const Note = require('../models/Note');

// @desc    Get notes for a lead
// @route   GET /api/notes/:leadId
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ leadId: req.params.leadId })
      .sort({ followUpDate: 1, createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create note for a lead
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { leadId, content, followUpDate } = req.body;
    
    const note = await Note.create({
      leadId,
      content,
      followUpDate: followUpDate || null,
      createdBy: req.userId
    });
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { content, followUpDate, isFollowUpCompleted } = req.body;
    
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content, followUpDate, isFollowUpCompleted },
      { new: true }
    );
    
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };