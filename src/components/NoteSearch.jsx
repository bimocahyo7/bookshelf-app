import React from "react";

const NoteSearch = ({ searchKeyword, onSearchChange }) => {
  return (
    <div className="note-search">
      <input type="text" placeholder="Search notes" value={searchKeyword} onChange={(e) => onSearchChange(e.target.value)} />
    </div>
  );
};

export default NoteSearch;
