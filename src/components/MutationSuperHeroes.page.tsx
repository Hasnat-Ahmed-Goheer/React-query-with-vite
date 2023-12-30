import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { request } from "../utils/axios-utils";
import { useRef } from "react";

const MutationSuperHeroes = () => {
  const nameRef = useRef();
  const egoRef = useRef();
  const queryClient = useQueryClient();

  const useQueryData = useQuery({
    queryKey: ["super-heroes"],
    queryFn: async () => {
      const { data } = await request({url: '/superheroes'});
      return data;
    },
    staleTime: 5000,
  });

  const useMutationData = useMutation({
    mutationFn: async (newHero: any) => {
      console.log(newHero);
      const { data } = await request(
        {
          url: "/superheroes",
          method: "POST",
          data: newHero,
        }
      );
      return data;
    },
    onSuccess: (data: any) => {
      // this will invalidate the query and refetch the data from the server by using the queryKey and a get request
      // queryClient.invalidateQueries(['super-heroes'])

      // this method will update the cache and add the new data to the cache and will not refetch the data from the server instead it will use the data from the cache
      queryClient.setQueryData(["super-heroes"], (old: any) => {
        return [...old, data];
      });
    },
    // onMutate : () =>{} is fired before the mutation is executed
    // onError : () =>{} is fired if the mutation fails
    // onSettled : () =>{} is fired after the mutation is executed
    // onSuccess : () =>{} is fired if the mutation is successful
    // queryClient.cancelQueries(['super-heroes']) is used to cancel the query if the mutation fails or if the user navigates away from the page before the mutation is completed
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const ego = egoRef.current?.value;
    useMutationData.mutate({ name, ego });
  };

  if (useQueryData.isLoading) return <div>Loading...</div>;
  if (useQueryData.isError) return <div>Error</div>;
  return (
    <>
      {useQueryData.data?.map((hero: any) => {
        return <h3 key={hero.id}>{hero.name}</h3>;
      })}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input type="text" name="" id="name" ref={nameRef} />
        <br />
        <label htmlFor="ego">Ego </label>
        <input type="text" name="" id="ego" ref={egoRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MutationSuperHeroes;
