// src/components/Search.jsx
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Results from "./Results"; 
import i18n from "../i18n"; // Importación corregida

const Search = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState([]);
  const [dbpediaResults, setDbpediaResults] = useState([]);
  const [error, setError] = useState(null);

  const executeSearch = async () => {
    if (!query) {
      alert(t("placeholder"));
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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{t("title")}</h1>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={handleLanguageChange}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
        />
      </div>
      <button className="btn btn-primary" onClick={executeSearch}>{t("searchButton")}</button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <Results title={t("localResults")} results={localResults} />
      <Results title={t("dbpediaResults")} results={dbpediaResults} />

      <footer className="footer mt-5 text-center">
        <span>{t("footerText")}</span>
      </footer>
    </div>
  );
};

export default Search;