import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import NoteInput from "../src/components/NoteInput";
import CharacterLimit from "../src/components/CharacterLimit";
import NoteSearch from "../src/components/NoteSearch";
import NotesList from "../src/components/NotesList";
import ArchivedNotes from "../src/components/ArchivedNotes";
import { getInitialData } from "../src/utils/index";

import "./styles/style.css";

class NoteApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      archivedNotes: [],
      newNote: { title: "", body: "" },
      searchKeyword: "",
    };
  }

  addNote = () => {
    const { notes, newNote } = this.state;

    const newNoteObject = {
      id: +new Date(),
      title: newNote.title,
      body: newNote.body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState({
      notes: [...notes, newNoteObject],
      newNote: { title: "", body: "" },
    });
  };

  deleteNote = (id, isArchived) => {
    const { notes, archivedNotes } = this.state;

    const updatedNotes = isArchived ? archivedNotes.filter((note) => note.id !== id) : notes.filter((note) => note.id !== id);

    isArchived ? this.setState({ archivedNotes: updatedNotes }) : this.setState({ notes: updatedNotes });
  };

  handleInputChange = (key, value) => {
    if (key === "title") {
      value = value.slice(0, 50);

      if (value.length <= 50) {
        this.setState((prevState) => ({
          newNote: { ...prevState.newNote, [key]: value },
        }));
      }
    } else {
      this.setState((prevState) => ({
        newNote: { ...prevState.newNote, [key]: value },
      }));
    }
  };

  toggleArchive = (id, isArchived) => {
    const { notes, archivedNotes } = this.state;

    const noteToToggle = isArchived ? archivedNotes.find((note) => note.id === id) : notes.find((note) => note.id === id);

    if (isArchived) {
      const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);
      this.setState({
        archivedNotes: updatedArchivedNotes,
        notes: [...notes, noteToToggle],
      });
    } else {
      const updatedNotes = notes.filter((note) => note.id !== id);
      this.setState({
        notes: updatedNotes,
        archivedNotes: [...archivedNotes, noteToToggle],
      });
    }
  };

  handleSearchChange = (value) => {
    this.setState({ searchKeyword: value });
  };

  render() {
    const { notes, archivedNotes, newNote, searchKeyword } = this.state;

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()));

    const filteredArchivedNotes = archivedNotes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
      <div>
        <div className="note-app__header">
          <h1>Note App</h1>
        </div>
        <div className="note-app__body">
          <NoteInput newNote={newNote} onInputChange={this.handleInputChange} onAddNote={this.addNote} />

          <CharacterLimit titleLength={newNote.title.length} />

          <NoteSearch searchKeyword={searchKeyword} onSearchChange={this.handleSearchChange} />

          {filteredNotes.length === 0 ? (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          ) : (
            <NotesList notes={filteredNotes} onDeleteNote={this.deleteNote} onToggleArchive={this.toggleArchive} isArchived={false} />
          )}

          {filteredArchivedNotes.length > 0 && (
            <ArchivedNotes archivedNotes={filteredArchivedNotes} onDeleteNote={this.deleteNote} onToggleArchive={this.toggleArchive} />
          )}
        </div>
      </div>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<NoteApp />);
