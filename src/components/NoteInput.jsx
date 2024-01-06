import React from "react";

const NoteInput = ({ newNote, onInputChange, onAddNote }) => {
  return (
    <div className="note-input">
      <input type="text" placeholder="Title" value={newNote.title} onChange={(e) => onInputChange("title", e.target.value)} />
      <textarea placeholder="Body" value={newNote.body} onChange={(e) => onInputChange("body", e.target.value)}></textarea>
      <button onClick={onAddNote}>Add Note</button>
    </div>
  );
};

export default NoteInput;
