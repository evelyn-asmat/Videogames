import { FETCH_VIDEOGAMES, SET_CURRENT_PAGE, SET_FILTERS, SET_LOADING_CARDS, SET_NEXT_PAGE, SET_PAGINATION, SET_PREVIOUS_PAGE, TOGGLE_ALERT } from "./actions";

const initialState = {
    filters: {
        order: '',
        genre: '',
        origin: '',
        name: '',
    },
    videogames: [],
    pagination: {
        current: 1,
        total: 0
    },
    alert: {
        show: false,
        message: ""
    },
    isLoadingCards: true
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
        case SET_NEXT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: state.pagination.current + 1
                }
            };
        case SET_PREVIOUS_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: state.pagination.current - 1
                }
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: payload
                }
            };
        case TOGGLE_ALERT:
            return {
                ...state,
                alert: payload
            };
        case SET_LOADING_CARDS:
            return {
                ...state,
                isLoadingCards: payload
            }
        default:
            return state;
    }
}