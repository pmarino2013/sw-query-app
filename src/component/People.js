import React, { useState } from "react";
// import SearchContext from "./SearchContext";
// import { useQuery } from "react-query"; //llamo libreria React Query
import { usePaginatedQuery } from "react-query";
// import Planet from "./Planet";

import Person from "./Person";

export const fetchPeople = async (key, page, persona) => {
  const res = await fetch(
    `http://swapi.dev/api/${key}/?page=${page}&&search=${persona}`
  );
  return res.json();
};

export default function People({ persona }) {
  const [page, setPage] = useState(1);

  // const { setBarView } = useContext(SearchContext);
  //useQuery
  //const recibe la data y el estado(loading, success o error)
  //useQuery recibe
  //   const { data, status } = useQuery("people", fetchPeople);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["people", page, persona],
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
