import React, { useState } from "react";

const ResultsLocalDB = ({ title, results }) => {
  return (
    <div className="results mt-4">
      <h2>{title}</h2>
      <div className="result-section">
        {results && results.length > 0 ? (
          results.map((result, index) => <ResultItem key={index} result={result} />)
        ) : (
          <div className="alert alert-info">No hay resultados disponibles</div>
        )}
      </div>
    </div>
  );
};

const ResultItem = ({ result }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="result-item card mb-2">
      <div className="card-body">
        <h5 className="card-title">{result.label || "Sin etiqueta"}</h5>

        <p className="card-text">
          <strong>Tipo:</strong> {result.type || "Sin tipo"}
        </p>

        {result.subject && (
          <a
            href={result.subject}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            {result.subject}
          </a>
        )}
        {!result.subject && <p className="card-text text-muted">Sin URL disponible</p>}
      </div>
    </div>
  );
};

export default ResultsLocalDB;
