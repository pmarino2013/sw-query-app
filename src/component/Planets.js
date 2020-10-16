import React, { useState, useContext } from "react";
import SearchContext from "./SearchContext";
//import { useQuery } from "react-query"; //llamo libreria React Query
import { usePaginatedQuery } from "react-query"; //llamo libreria React Query
import { ReactQueryDevtools } from "react-query-devtools";

import Planet from "./Planet";

export const fetchPlanets = async (key, page, buscar) => {
  const res = await fetch(
    `http://swapi.dev/api/${key}/?page=${page}&&search=${buscar}`
  );
  return res.json();
};

export default function Planets() {
  const [page, setPage] = useState(1); //creo state para manejar las paginas

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
    ["planets", page, buscar],
    fetchPlanets,
    {
      staleTime: 0,
      onSuccess: () => console.log("Data cargada"), //se ejecuta cuando status es success
    }
  );

  return (
    <div>
      <h2> Planets </h2>

      {status === "success" && (
        <>
          <input type="text" onChange={handleChange} onClick={limpiarCampo} />
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span className="card"> {page} </span>
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
