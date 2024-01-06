import React from "react";

const CharacterLimit = ({ titleLength }) => {
  return <p className="note-input__title__char-limit">{titleLength}/50 characters</p>;
};

export default CharacterLimit;
