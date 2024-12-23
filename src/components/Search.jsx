import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ResultsDBpedia from "./ResultsDBpedia";
import ResultsLocalDB from "./ResultsLocalDB"; // Nuevo componente
import i18n from "../i18n";

const Search = () => {
  const { t } = useTranslation();
  const [inputData, setInputData] = useState("");
  const [local_results, setlocal_results] = useState([]);
  const [dbpediaResults, setDbpediaResults] = useState([]);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("es"); // Valor por defecto es Español

  const executeSearch = async () => {
    if (!inputData.trim()) {
      alert(t("placeholder"));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/search/${inputData}/${language}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const { dbpedia_results = [], local_results = [] } = response.data;

      setlocal_results(local_results);
      setDbpediaResults(dbpedia_results);
      setError(null);
    } catch (err) {
      console.error("Error durante la búsqueda:", err);
      setError(err.response?.data?.error || t("unknownError"));
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage); // Asignar el idioma seleccionado
    i18n.changeLanguage(selectedLanguage); // Cambiar el idioma en i18n
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{t("title")}</h1>
      <div className="mb-3">
        <select className="form-select" onChange={handleLanguageChange} value={language}>
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder={t("placeholder")}
        />
      </div>
      <button className="btn btn-primary" onClick={executeSearch}>
        {t("searchButton")}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Resultados locales */}
      <ResultsLocalDB
        title={t("local_results")}
        results={local_results.map((result) => ({
          label: result.label || "Sin etiqueta",
          subject: result.subject || "Sin URL",
          type: result.type || "Sin tipo",
        }))}
      />

      {/* Resultados de DBpedia */}
      <ResultsDBpedia
        title={t("dbpediaResults")}
        results={dbpediaResults.map((result) => ({
          label: result.label || "Sin etiqueta",
          comment: result.comment || "Sin comentarios",
          subject: result.subject || "Sin URL",
          type: result.type || "Sin tipo",
        }))}
      />

      <footer className="footer mt-5 text-center">
        <span>{t("footerText")}</span>
      </footer>
    </div>
  );
};

export default Search;
