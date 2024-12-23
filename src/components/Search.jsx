import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";

const Search = () => {
  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState([]);
  const [dbpediaResults, setDbpediaResults] = useState([]);
  const [error, setError] = useState(null);

  const executeSearch = async () => {
    if (!query) {
      alert("Por favor, ingresa una consulta SPARQL.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/search", { query });
      const { localResults, dbpediaResults } = response.data;

      setLocalResults(localResults || []);
      setDbpediaResults(dbpediaResults || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error desconocido");
    }
  };

  return (
    <div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscador..."
      />
      <button onClick={executeSearch}>Buscar</button>
      {error && <div className="error">{error}</div>}
      <Results title="Resultados Locales" results={localResults} />
      <Results title="Resultados de DBpedia" results={dbpediaResults} />
    </div>
  );
};

export default Search;
