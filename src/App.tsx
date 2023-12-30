import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.page";
import RQSuperheroes from "./components/RQSuperheroes.page";
import Superheroes from "./components/Superheroes.page";
import RQSuperHero from "./components/RQSuperHero.page";
import DynamicQueries from "./components/DynamicQueries.page";
import PaginatedQueries from "./components/PaginatedQueries.page";
import MutationSuperHeroes from "./components/MutationSuperHeroes.page";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">SuperHeroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">RQSuperHeroes</Link>
          </li>
          <li>
            <Link to="/parallel-queries">Dynamic Queries</Link>
          </li>
          <li>
            <Link to="/paginated">Paginated Queries</Link>
          </li>
          <li>
            <Link to="/sp-mutate">Mutation and Queries</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/super-heroes" element={<Superheroes />} />
        <Route path="/rq-super-heroes" element={<RQSuperheroes />} />
        <Route path="/rq-super-hero/:heroId" element={<RQSuperHero />} />
        <Route path="/parallel-queries" element={<DynamicQueries />} />
        <Route path="/paginated" element={<PaginatedQueries/>} />
        <Route path="/sp-mutate" element={<MutationSuperHeroes/>} />
      </Routes>
    </div>
  );
}

export default App;

//  using the useQuery in the same file does provide the types in TS therefore it might be better to do it in the same file

// post -> ['post']
// post/1 -> ['post', 1]
// post?id=2 -> ['post', {id :2}]
// if we want to use useMutate check the video once more WEB DEV SIMPLIFIED