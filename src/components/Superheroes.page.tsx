import axios from "axios";
import { useEffect, useState } from "react"


 interface DB {
  data : superhero[];
}

export interface superhero {
  id: number;
  name: string;
  alterEgo: string;
}


const Superheroes = () => {
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([{id:0,name:"",alterEgo:""}]);
    const [,setError] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            const response:DB = await axios.get(
              "http://localhost:4000/superheroes"
            );
            const error = axios.isAxiosError(response);
            const data:superhero[] = response.data;
            setData(data);
            setError(error);
            setLoading(false);
        }
        fetchData();
        
    },[])
  return <>{loading ? <div>Loading...</div> : <div>
      {data.map((hero) => (
        <div key={hero.id}>
          <h2>{hero.name}</h2>
          <p>{hero.alterEgo}</p>
        </div>
      ))}
  </div> }</>;
}

export default Superheroes