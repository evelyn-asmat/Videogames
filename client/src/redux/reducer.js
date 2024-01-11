import { FETCH_VIDEOGAMES, SET_CURRENT_PAGE, SET_FILTERS, SET_NEXT_PAGE, SET_PAGINATION, SET_PREVIOUS_PAGE } from "./actions";

const initialState = {
    filters: {
        orderName: '',
        orderRating: '',
        genre: '',
        origin: '',
        name: '',
    },
    videogames: [],
    pagination: {
        current: 1,
        total: 0
    }
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FILTERS:
            return {
                ...state,
                filters: payload,
            };
        case FETCH_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: payload,
            };
        case SET_NEXT_PAGE, SET_PREVIOUS_PAGE, SET_CURRENT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: payload
                }
            };
        default:
            return state;
    }
}