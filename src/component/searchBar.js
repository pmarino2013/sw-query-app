import React from "react";

export default function SearchBar({ handleChange, handleClick, search }) {
  return (
    <div className="container">
      <input
        type="text"
        onChange={handleChange}
        onClick={handleClick}
        name="buscar"
        value={search}
        autoComplete="off"
      />
    </div>
  );
}
