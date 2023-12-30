import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const colorsFn = async ({queryKey}) => {
  const id = queryKey[1];
  const { data } = await axios.get(`http://localhost:4000/colors?_limit=2&_page=${id}`);
  return data;
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);
  const queries = useQuery({
    // since each is a new page have to pass page as a key
    queryKey: ["colors",page],
    enabled: true,
    // refetchOnWindowFocus:true,
    // this will keep the previous data and then fetch the new data and then merge the previous data with the new data
    keepPreviousData: true,
    queryFn:  colorsFn,
  });
  return (
    <div>
      {queries.isFetching ? <p>Loading...</p> :queries.data?.map((color: any) => {
        return (
          <h2>
            <span>{color.id}.</span> {color.name}
          </h2>
        );
      })}
        <button
            onClick={() => {
            setPage((old) => old - 1);
            }} disabled={page === 1} >Previous Page</button>
        <button
            onClick={() => {
            setPage((old) => old + 1);
            }} disabled={page === 5} >Next Page</button>
    </div>
  );
};

export default PaginatedQueries;

// http://localhost:4000/colors?_limit=2&_page=3

// ?_limit means that the queries are limited to 2 per page and &_page=1 refers to 1st page and &_page=2 refers to 2nd page and so on
