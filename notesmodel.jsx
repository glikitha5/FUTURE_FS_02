import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api';

function NotesModal({ lead, onClose, onNoteUpdate }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [lead._id]);

  const fetchNotes = async () => {
    const response = await getNotes(lead._id);
    setNotes(response.data);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    await createNote({
      leadId: lead._id,
      content: newNote,
      followUpDate: followUpDate || null,
    });
    
    setNewNote('');
    setFollowUpDate('');
    fetchNotes();
    onNoteUpdate();
  };

  const handleToggleFollowUp = async (note) => {
    await updateNote(note._id, {
      ...note,
      isFollowUpCompleted: !note.isFollowUpCompleted,
    });
    fetchNotes();
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Delete this note?')) {
      await deleteNote(noteId);
      fetchNotes();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3>Notes & Follow-ups for {lead.name}</h3>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        <div style={styles.notesList}>
          {notes.length === 0 ? (
            <p style={styles.noNotes}>No notes yet</p>
          ) : (
            notes.map(note => (
              <div key={note._id} style={styles.noteItem}>
                <div style={styles.noteContent}>
                  <p>{note.content}</p>
                  {note.followUpDate && (
                    <div style={styles.followUpInfo}>
                      📅 Follow-up: {new Date(note.followUpDate).toLocaleDateString()}
                      <button
                        onClick={() => handleToggleFollowUp(note)}
                        style={{
                          ...styles.completeBtn,
                          backgroundColor: note.isFollowUpCompleted ? '#28a745' : '#ffc107',
                        }}
                      >
                        {note.isFollowUpCompleted ? '✓ Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  )}
                  <small style={styles.timestamp}>
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  style={styles.deleteNoteBtn}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddNote} style={styles.form}>
          <textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={styles.textarea}
            rows="3"
          />
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            style={styles.dateInput}
          />
          <button type="submit" style={styles.addBtn}>Add Note</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '600px',
    maxWidth: '90%',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #ddd',
  },
  closeBtn: {
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  },
  notesList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  noteItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noteContent: {
    flex: 1,
  },
  followUpInfo: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#666',
  },
  completeBtn: {
    marginLeft: '10px',
    padding: '2px 8px',
    border: 'none',
    borderRadius: '3px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '11px',
  },
  deleteNoteBtn: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  timestamp: {
    display: 'block',
    marginTop: '5px',
    fontSize: '11px',
    color: '#999',
  },
  form: {
    padding: '20px',
    borderTop: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  dateInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  addBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noNotes: {
    textAlign: 'center',
    color: '#999',
  },
};

export default NotesModal;