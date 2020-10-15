import React from "react";
// import SearchContext from "./SearchContext";

export default function Navbar({ setPage, setSearch }) {
  // const { setBarView } = useContext(SearchContext);
  return (
    <nav>
      <button
        onClick={() => {
          setPage("planets");
          setSearch("");
          // setBarView(false);
        }}
      >
        Planets
      </button>
      <button
        onClick={() => {
          setPage("people");
          setSearch("");
          // setBarView(false);
        }}
      >
        People
      </button>
    </nav>
  );
}
