import React from "react";
import { showFormattedDate } from "../utils/index";

const ArchivedNotes = ({ archivedNotes, onDeleteNote, onToggleArchive }) => {
  return (
    <div>
      <h2>Archived Notes</h2>
      <div className="notes-list">
        {archivedNotes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-item__content">
              <h2 className="note-item__title">{note.title}</h2>
              <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
              <p className="note-item__body">{note.body}</p>
            </div>
            <div className="note-item__action">
              <button className="note-item__delete-button" onClick={() => onDeleteNote(note.id, true)}>
                Delete
              </button>
              <button className="note-item__archive-button" onClick={() => onToggleArchive(note.id, true)}>
                Unarchive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedNotes;
