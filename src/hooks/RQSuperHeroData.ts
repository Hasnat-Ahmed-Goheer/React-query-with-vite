import { useQuery,useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const fetchHeroData = async ({ queryKey }) => {
  const heroId = queryKey[1];
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`
  );
  const data = await response.data;
  return data;
};
export const useSuperHeroData = (id) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["rq-superhero", id],
    // it dynamically passes the key to the function so there is no need to pass it in the function itself as shown in the fetchData function the queryKey is provided as a parameter to the function and it is an array therefore it has to be destructured to get the id as shown in the fetchHeroData function 
    queryFn: fetchHeroData,
    // initialData:() =>{
    //   const hero = queryClient.getQueryData('rq-superheroes')?.data.find((h) => h.id === id);
    //   return hero;
    // }
  });
};

// this can also be done in the same RQSuperHero.page.tsx file