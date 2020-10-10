import React, { useState } from "react";

import Navbar from "./component/Navbar";
import People from "./component/People";
import Planets from "./component/Planets";

function App() {
  const [page, setPage] = useState("planets");
  return (
    <div className="App">
      <h1>StarWars info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
        {page === "planets" ? <Planets /> : <People />}
      </div>
    </div>
  );
}

export default App;
