import { API_URL } from '../utils/constants';
import axios from "axios";
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_PAGINATION = 'SET_PAGINATION';
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE';
export const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOGGLE_ALERT = 'TOGGLE_ALERT';
export const SET_LOADING_CARDS = 'SET_LOADING_CARDS';


export const fetchVideogames = (filters, page) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/videogames`, { params: { ...filters, page: page || 1 } });
            dispatch({
                type: SET_PAGINATION,
                payload: {
                    current: page || 1,
                    total: Math.ceil(response.headers['total-videogames'] / 15)
                },
            });
            await dispatch({
                type: FETCH_VIDEOGAMES,
                payload: response.data,
            });
            dispatch({
                type: SET_LOADING_CARDS,
                payload: false,
            });
        } catch (error) {
            alert(error.message);
        }
    };
};

export const setFilters = (filters) => ({
    type: SET_FILTERS,
    payload: filters
});

export const setNextPage = () => ({
    type: SET_NEXT_PAGE
});

export const setPreviousPage = () => ({
    type: SET_PREVIOUS_PAGE
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

export const showAlert = (message) => ({
    type: TOGGLE_ALERT,
    payload: {
        show: true,
        message: message
    }
})

export const hideAlert = () => ({
    type: TOGGLE_ALERT,
    payload: {
        show: false,
        message: ""
    }
})

export const setLoadingCards = (loadingState) => ({
    type: SET_LOADING_CARDS,
    payload: loadingState
});

