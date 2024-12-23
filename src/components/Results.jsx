import React from "react";

const Results = ({ title, results }) => (
  <div className="result-section">
    <h2>{title}</h2>
    <div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div className="result-item" key={index}>
            {result}
          </div>
        ))
      ) : (
        <p>No hay resultados.</p>
      )}
    </div>
  </div>
);

export default Results;
