// if we want data from different endpoints, we can use parallel queries meaning we can use multiple requests in the same query to get the data
// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"

// const fetchSuperHeroes = async () => {
//     const { data } = await axios.get("http://localhost:4000/superheroes")
//     return data;
// }
// const fetchFriends = async () => {
//     const { data } = await axios.get("http://localhost:4000/friends")
//     return data;
// }

// const DynamicQueries = () => {
//     const { data: superHeroes, isLoading: isSuperHeroesLoading } = useQuery("superheroes", fetchSuperHeroes)
//     const { data: friends, isLoading: isFriendsLoading } = useQuery("friends", fetchFriends)
//   return (
//     <div>DynamicQueries</div>
//   )
// }

// export default DynamicQueries

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
const ID = [1, 2, 3];
const DynamicQueries = () => {
  const useData = useQueries({
    queries: ID.map((id) => ({
      queryKey: ["superhero", id],
      queryFn: async () => {
        const { data } = await axios.get(
          `http://localhost:4000/superheroes/${id}`
        );
        return data;
      },
    })),
  });
  console.log(useData)
  return <div>{
        useData.map(array =>{
            return <div>{array.data.name}</div>
        })
    }</div>;
};

export default DynamicQueries;

// if a data as a key that might be used as an id in another database then we can use react query to fetch the previous data and then use it to fetch the next data by passing it as a query key or as a parameter in the url and then use useQuery to fetch the data