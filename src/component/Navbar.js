import React from "react";
// import SearchContext from "./SearchContext";

export default function Navbar({ setPage }) {
  // const { setBarView } = useContext(SearchContext);
  return (
    <nav>
      <button
        onClick={() => {
          setPage("planets");

          // setBarView(false);
        }}
      >
        Planets
      </button>
      <button
        onClick={() => {
          setPage("people");

          // setBarView(false);
        }}
      >
        People
      </button>
    </nav>
  );
}
