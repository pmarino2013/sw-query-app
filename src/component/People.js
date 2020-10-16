import React, { useContext, useState } from "react";
import SearchContext from "./SearchContext";

// import { useQuery } from "react-query"; //llamo libreria React Query
import { usePaginatedQuery } from "react-query";

import Person from "./Person";

export const fetchPeople = async (key, page, buscar) => {
  const res = await fetch(
    `http://swapi.dev/api/${key}/?page=${page}&&search=${buscar}`
  );
  return res.json();
};

export default function People() {
  const [page, setPage] = useState(1);

  const { buscar, setBuscar } = useContext(SearchContext);

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  const limpiarCampo = (e) => {
    e.target.value = "";
    handleChange(e);
    setPage(1);
  };

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["people", page, buscar],
    fetchPeople,
    {
      staleTime: 0,
      // onSuccess: () => setBarView(true), //se ejecuta cuando status es success
    }
  );

  return (
    <div>
      <h2>People</h2>
      {status === "success" && (
        <>
          <div>
            <input type="text" onChange={handleChange} onClick={limpiarCampo} />
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous page
            </button>
            <span className="card">{page}</span>
            <button
              onClick={() =>
                setPage((old) =>
                  !latestData || !latestData.next ? old : old + 1
                )
              }
              disabled={!latestData || !latestData.next}
            >
              Next page
            </button>
          </div>
          <div>
            {resolvedData.results.map((person, i) => (
              <div key={i}>
                <Person person={person} />
              </div>
            ))}
          </div>
        </>
      )}
      {status === "loading" && <div>Loading Data...</div>}
      {status === "error" && <div>Error fetching data</div>}
    </div>
  );
}
