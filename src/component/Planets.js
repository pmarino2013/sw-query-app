import React, { useEffect, useState } from "react";
// import SearchContext from "./SearchContext";
//import { useQuery } from "react-query"; //llamo libreria React Query
import { usePaginatedQuery } from "react-query"; //llamo libreria React Query
import { ReactQueryDevtools } from "react-query-devtools";

import Planet from "./Planet";

export const fetchPlanets = async (key, page, buscar) => {
  // if (planeta) {
  //   const res = await fetch(`http://swapi.dev/api/${key}/?search=${planeta}`);

  //   return res.json();
  // } else {
  const res = await fetch(
    `http://swapi.dev/api/${key}/?page=${page}&&search=${buscar}`
  );
  return res.json();
};

export default function Planets({ search }) {
  const [page, setPage] = useState(1); //creo state para manejar las paginas

  const [buscar, setBuscar] = useState("");

  const handleChange = (e) => {
    setBuscar(e.target.value);
  };

  const limpiarCampo = (e) => {
    e.target.value = "";
    handleChange(e);
    setPage(1);
  };

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page, buscar],
    fetchPlanets,
    {
      staleTime: 0,
      onSuccess: () => console.log(resolvedData), //se ejecuta cuando status es success
    }
  );

  return (
    <div>
      <h2> Planets </h2>
      <input type="text" onChange={handleChange} onClick={limpiarCampo} />
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span> {page} </span>
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
          <div>
            {/* {data.results.map((planet, i) => ( */}
            {resolvedData.results.map((planet, i) => (
              <div key={i}>
                <Planet planet={planet} />
              </div>
            ))}
          </div>
        </>
      )}
      {status === "loading" && <div> Loading Data... </div>}
      {status === "error" && <div> Error fetching data </div>}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
