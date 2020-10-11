import React, { useState } from "react";
//import { useQuery } from "react-query"; //llamo libreria React Query
import { usePaginatedQuery } from "react-query"; //llamo libreria React Query
import { ReactQueryDevtools } from "react-query-devtools";
// import { fetchPlanets } from "../helpers/FetchPlanets";
import Planet from "./Planet";

export const fetchPlanets = async (key, page, planeta) => {
  const res = await fetch(
    `http://swapi.dev/api/${key}/?page=${page}&&search=${planeta}`
  );
  return res.json();
};

export default function Planets({ planeta }) {
  const [page, setPage] = useState(1); //creo state para manejar las paginas

  //useQuery
  //const recibe la data y el estado(loading, success o error)
  //useQuery recibe
  //   const { data, status } = useQuery(["planets", page], fetchPlanets, {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page, planeta],
    fetchPlanets,
    {
      staleTime: 0,
      onSuccess: () => console.log("data cargada"), //se ejecuta cuando status es success
    }
  );

  return (
    <div>
      <h2>Planets</h2>

      {/* <button onClick={() => setPage(1)}>Pagina 1</button>
      <button onClick={() => setPage(2)}>Pagina 2</button>
      <button onClick={() => setPage(3)}>Pagina 3</button> */}

      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
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
      {status === "loading" && <div>Loading Data...</div>}
      {status === "error" && <div>Error fetching data</div>}

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
