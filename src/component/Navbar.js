import React from "react";

export default function Navbar({ setPage, setSearch }) {
  return (
    <nav>
      <button
        onClick={() => {
          setPage("planets");
          setSearch("");
        }}
      >
        Planets
      </button>
      <button
        onClick={() => {
          setPage("people");
          setSearch("");
        }}
      >
        People
      </button>
    </nav>
  );
}
