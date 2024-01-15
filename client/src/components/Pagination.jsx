import '../styles/components/pagination.css'

import { fetchVideogames, setCurrentPage, setLoadingCards, setNextPage, setPreviousPage } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

export default function Pagination() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const pagination = useSelector(state => state.pagination);
  const isLoadingCards = useSelector(state => state.isLoadingCards);

  const handleChangePage = (page) => {
    dispatch(setLoadingCards(true));
    dispatch(setCurrentPage(page));
    dispatch(fetchVideogames(filters, page));
  }
  const handleNextPage = () => {
    dispatch(setLoadingCards(true));
    dispatch(fetchVideogames(filters, pagination.current + 1));
    dispatch(setNextPage());
  }
  const handlePreviousPage = () => {
    dispatch(setLoadingCards(true));
    dispatch(fetchVideogames(filters, pagination.current - 1));
    dispatch(setPreviousPage());
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= pagination.total; i++) {
      pageNumbers.push(
        <li key={i} className={pagination.current === i ? 'active' : ''}>
          <button onClick={() => handleChangePage(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };
  return (
    <>
      {pagination.total > 1
        ? (
          <div className={`pagination ${isLoadingCards ? "hidden": ""}`}>
            <button onClick={() => handlePreviousPage()} disabled={pagination.current === 1}>
              <img src="https://img.icons8.com/external-others-inmotus-design/18/external-Left-8-bits-others-inmotus-design.png" alt="Previous" />
            </button>
            <ul>
              {renderPageNumbers()}
            </ul>
            <button onClick={() => handleNextPage()} disabled={pagination.current === pagination.total}>
              <img src="https://img.icons8.com/external-others-inmotus-design/18/external-Right-8-bits-others-inmotus-design.png" alt="Next" />
            </button>
          </div>
        ) : ""
      }
    </>
  );
};