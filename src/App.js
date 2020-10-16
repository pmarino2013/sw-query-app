import React, { useState } from "react";
import SearchContext from "./component/SearchContext";

import Navbar from "./component/Navbar";
import People from "./component/People";
import Planets from "./component/Planets";

import Logo from "./img/logo2.png";

function App() {
  const [page, setPage] = useState("planets");
  const [buscar, setBuscar] = useState("");

  return (
    <div className="App">
      <h1>
        <img src={Logo} alt="logo" /> info
      </h1>
      <Navbar setPage={setPage} />
      <SearchContext.Provider value={{ buscar, setBuscar }}>
        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
