// src/Results.js
import React from 'react';

const Results = ({ title, results }) => {
  return (
    <div className="results mt-4">
      <h2>{title}</h2>
      <div className="result-section">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-item card mb-2">
              <div className="card-body">
                {result}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">No hay resultados disponibles</div>
        )}
      </div>
    </div>
  );
};

export default Results;