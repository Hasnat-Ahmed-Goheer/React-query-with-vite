// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

import { useRef } from "react";
import { useSuperheroesData } from "../hooks/RQSuperheroesData";
import { superhero } from "./Superheroes.page";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//  const fetchData = async () => {
//       const response = await axios.get("http://localhost:4000/superheroes");
//       const data = await response.data;
//       return data;
//     }
const onSuccess = (data: unknown) => {
  console.log("Successfully fetched the data ", data);
};
const onError = (error: unknown) => {
  console.log("Failed to fetch the data", error);
};

const RQSuperheroes = () => {
  const queryClient = useQueryClient();
  const superheroesQuery = useSuperheroesData(onSuccess, onError);
  const nameRef = useRef();
  const egoRef = useRef();
  let name;
  let ego;

  // const superheroesQuery = useQuery({
  //   queryKey:['rq-superheroes'],
  //   queryFn:fetchData,
  //   enabled:false,

  //   onSuccess,
  //   onError,
  // these will be deprecated in the future however they are still supported for now and are used to response to the request made to the server that's why there is a onSuccess and onError property in the useQuery hook if the request is successful then the onSuccess property will be called and if the request is unsuccessful then the onError property will be called and the data will be logged to the console

  // -----------------select: (data : unknown) => {
  //   const heroName = data.map((hero:superhero) => hero.name);
  //   return heroName;
  // }
  // this property is used to play with the response inside of the query so that it can be filtered as needed e-g., if we want to get the name of the heroes only then we can use this property to filter the data and return the name of the heroes only and not the whole data
  // it is used to transform the data that we get from the server

  //-------------- enabled:true,
  // by default it is true and it will make the request to the server however if we set it to false then it will not make the request to the server and the data will not be fetched from the server whenever the component is rendered

  //-------------- cacheTime:5000,
  // this will stor the data in the cache for the next 5 seconds as specified in the cacheTime property and will not make a new request to the server for the next 5 seconds when inactive but after 5 seconds the data will be garbage collected and a new request will be made to the server
  // by default it is 5 minutes
  // along with isLoading,isError and isSuccess we also get isFetching which is true when the data is being fetched from the server
  // we also get error along with isError which is the error object containing the error message

  // ------------- staleTime: 30000,
  //this is used to make sure that the request is not made to the server if the data is already present in the cache and is not stale i.e. the data is not older than the staleTime therefore it doesn't make a request to the server for the next 30 seconds
  // the query will stay fresh for the next 30 seconds and will not be garbage collected
  // default is 0 seconds

  // -------------- refetchOnMount: true,
  // it will refetch the data when the component is mounted and by default it is true and it will refetch the data when the component is mounted however if we set it to false then it will not refetch the data when the component is mounted (component mounted when the component is rendered)

  //---------- refetchOnWindowFocus:false,
  // by default it is true and it will refetch the data when the window is focused however if we set it to false then it will not refetch the data when the window is focused and it ensures that the ui is in sync with the data in the server this also happens when the data has changed

  // polling refers to fetching data at regular intervals
  // ---------- refetchInterval: 1000,
  // it will refetch the data after every 1 second

  //------------ refetchIntervalInBackground: true,
  // it is paused when the window is not focused and resumes when the window is focused however if we set the below property to true then it will not pause even when the window is not focused
  // by default set to false
  // })

  const handleClick = () => {
    superheroesQuery.refetch();
  };

  const mutation = useMutation({
    mutationFn: async (hero) => {
      axios.post("http://localhost:4000/superheroes", hero);
    },
    onSuccess: () => queryClient.invalidateQueries(["rq-superheroes"]),
  });
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    name  = nameRef?.current?.value;
    ego = egoRef?.current?.value;
    mutation.mutate({ name, ego });
  };
  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <input type="text" ref={nameRef} />
          <input type="text" ref={egoRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* isLoading gives the state in which the query is being loaded as in the process of requesting and fetching and all other states before the query data is available however the isFetching state is used to is the query is being fetched or not both are fairly similar but loading is used when there is no clickable or submit-able event and fetching is used otherwise */}
      {/* {superheroesQuery.isLoading || superheroesQuery.isFetching ? ( */}
      {superheroesQuery.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* the map is giving an error because the type is unknown */}
          {superheroesQuery.data?.map((hero: superhero) => (
            <div key={hero.id}>
              <h2>
                <Link to={`/rq-super-hero/${hero.id}`}>{hero.name}</Link>
              </h2>
            </div>
          ))}
          {/* {superheroesQuery.data?.map((hero: string) => (
            <div key={hero}>
              <h2>{hero}</h2>
            </div>
          )
          )} */}
        </div>
      )}
      {/* refetch sends the request */}
      <button onClick={handleClick}>Get SuperHeroes</button>
    </>
  );
};

export default RQSuperheroes;
