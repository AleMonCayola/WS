import React, { useState } from "react";

const Results = ({ title, results }) => {
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
        <h5 className="card-title">{result.label}</h5>

        {result.comment && (
          <p className="card-text">
            <strong>Descripción:</strong>{" "}
            {isExpanded
              ? result.comment
              : `${result.comment.slice(0, 150)}...`}
            <button
              className="btn btn-link p-0 ms-2"
              onClick={toggleExpand}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          </p>
        )}

        <p className="card-text">
          <strong>Tipo:</strong> {result.type}
        </p>
        <a
          href={result.subject}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          {result.subject}
        </a>
      </div>
    </div>
  );
};

export default Results;
