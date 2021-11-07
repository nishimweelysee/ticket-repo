import { SEARCH_TYPE_ALLEVENTS } from "../../types/searchTypes";


const initialState = {
    name:"",
    place:"",
    dateRange:[new Date(), new Date()],
    date:new Date(),
    category:[],
    country:[],
    host:[]
}

export const searchParamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TYPE_ALLEVENTS:
            return {
                ...state,
                pending: true,
                name:action.payload.search,
                place:action.payload.place,
                dateRange:action.payload.dateRange,
                date:action.payload.date,
                category:action.payload.category,
                country:action.payload.country,
                host:action.payload.host
            }
        default:
            return state
    }
}