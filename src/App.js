import React, { useState } from "react";

// import SearchContext from "./component/SearchContext";

import Navbar from "./component/Navbar";
import People from "./component/People";
import Planets from "./component/Planets";
import SearchBar from "./component/searchBar";

function App() {
  const [page, setPage] = useState("planets");
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    e.target.value = "";
    handleChange(e);
  };

  return (
    <div className="App">
      <h1> StarWars info </h1>
      <Navbar setPage={setPage} setSearch={setSearch} />
      <div className="content">
        <SearchBar
          handleChange={handleChange}
          handleClick={handleClick}
          search={search}
        />
        {page === "planets" ? (
          <Planets search={search} />
        ) : (
          <People persona={search} />
        )}
      </div>
    </div>
  );
}

export default App;
