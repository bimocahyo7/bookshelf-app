import React from "react";
import { showFormattedDate } from "../utils/index";

const NotesList = ({ notes, onDeleteNote, onToggleArchive, isArchived }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="note-item__content">
            <h2 className="note-item__title">{note.title}</h2>
            <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
            <p className="note-item__body">{note.body}</p>
          </div>
          <div className="note-item__action">
            <button className="note-item__delete-button" onClick={() => onDeleteNote(note.id, isArchived)}>
              Delete
            </button>
            <button className="note-item__archive-button" onClick={() => onToggleArchive(note.id, isArchived)}>
              {isArchived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
