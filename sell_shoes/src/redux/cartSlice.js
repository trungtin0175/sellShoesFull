const initialState = {
    cartItems: [],
    // Các state khác của giỏ hàng...
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload], // Thêm sản phẩm vào giỏ hàng
            };
        default:
            return state;
    }
};

export default cartReducer;
