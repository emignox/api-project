import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SinglePokemon from "./singlePokemon";

import Pokemon from "./pokemon";

function App() {
  return (
    <Router basename="/api-project">
      <div className="App">
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/pokemon/:name" element={<SinglePokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
