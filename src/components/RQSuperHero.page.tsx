import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/RQSuperHeroData";
// import { useQuery } from "@tanstack/react-query";

const RQSuperHero = () => {
  const { heroId } = useParams();

//   const superheroData = useQuery({
//     queryKey: ["rq-superhero", heroId],
//     queryFn: () => {
//       return fetch(`http://localhost:4000/superheroes/${heroId}`).then(
//         (res) => res.json()
//       );
//     },
//   });
  const superheroData = useSuperHeroData(heroId);
  return (
    <div>
      {superheroData.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div key={superheroData.data?.id}>
          {superheroData.data.name} - {superheroData.data.alterEgo}
        </div>
      )}

      <div></div>
    </div>
  );
};

export default RQSuperHero;
