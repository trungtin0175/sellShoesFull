import { SORT_INCREASE, SORT_DECREASE } from './actions';

const initialState = {
    product: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_INCREASE:
            return {
                ...state,
                product: [...state.product].sort((a, b) => a.newPrice_product - b.newPrice_product),
            };
        case SORT_DECREASE:
            return {
                ...state,
                product: [...state.product].sort((a, b) => b.newPrice_product - a.newPrice_product),
            };
        default:
            return state;
    }
};

export default productReducer;
