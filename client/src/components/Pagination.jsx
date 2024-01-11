import '../styles/components/pagination.css'

import { fetchVideogames, setCurrentPage, setNextPage, setPreviousPage } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

export default function Pagination() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const pagination = useSelector(state => state.pagination);

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchVideogames(filters, page));
  }
  const handleNextPage = (page) => {
    dispatch(setNextPage(page));
    dispatch(fetchVideogames(filters, page));
  }
  const handlePreviousPage = (page) => {
    dispatch(setPreviousPage(page));
    dispatch(fetchVideogames(filters, page));
  }
  
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= pagination.total; i++) {
      pageNumbers.push(
        <li key={ i } className={ pagination.current === i ? 'active' : '' }>
          <button onClick={() => handleChangePage(i)}>{ i }</button>
        </li>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      {  pagination.total > 1
      ? (
        <>
          <button onClick={() => handlePreviousPage(pagination.current)} disabled={pagination.current === 1}>
          <img src="https://img.icons8.com/external-others-inmotus-design/18/external-Left-8-bits-others-inmotus-design.png" alt="Previous"/>
          </button>
          <ul>
            {renderPageNumbers()}
          </ul>
          <button onClick={() => handleNextPage(pagination.current)} disabled={pagination.current === pagination.total}>
            <img src="https://img.icons8.com/external-others-inmotus-design/18/external-Right-8-bits-others-inmotus-design.png" alt="Next"/>
          </button>
        </>
      ) : ""
      }
    </div>
  );
};