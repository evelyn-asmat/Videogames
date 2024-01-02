import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      <img width="18" height="18" src="https://img.icons8.com/external-others-inmotus-design/67/external-Left-8-bits-others-inmotus-design.png" alt="Previous"/>
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <img width="18" height="18" src="https://img.icons8.com/external-others-inmotus-design/67/external-Right-8-bits-others-inmotus-design.png" alt="Next"/>
      </button>
    </div>
  );
};

export default Pagination;