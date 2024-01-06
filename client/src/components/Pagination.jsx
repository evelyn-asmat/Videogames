import '../styles/components/pagination.css'

import React from 'react';

export default function Pagination(props) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={props.currentPage === i ? 'active' : ''}>
          <button onClick={() => props.onPageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };
  return (
    <div className="pagination">
      {  props.totalPages && props.totalPages > 1
      ? (
        <>
          <button onClick={() => props.onPageChange(props.currentPage - 1)} disabled={props.currentPage === 1}>
          <img width="18" height="18" src="https://img.icons8.com/external-others-inmotus-design/67/external-Left-8-bits-others-inmotus-design.png" alt="Previous"/>
          </button>
          <ul>
            {renderPageNumbers()}
          </ul>
          <button onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage === props.totalPages}>
            <img width="18" height="18" src="https://img.icons8.com/external-others-inmotus-design/67/external-Right-8-bits-others-inmotus-design.png" alt="Next"/>
          </button>
        </>
      ) : ""
      }
    </div>
  );
};