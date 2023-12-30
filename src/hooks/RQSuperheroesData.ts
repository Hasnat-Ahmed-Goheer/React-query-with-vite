import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchData = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  const data = await response.data;
  return data;
};

export const useSuperheroesData = (onSuccess:(data: unknown) => void, onError: (error: unknown) => void) => {
  return useQuery({
    queryKey: ["rq-superheroes"],
    queryFn: fetchData,
    // enabled: false,
    enabled: true,

    onSuccess,
    onError,
  });
};