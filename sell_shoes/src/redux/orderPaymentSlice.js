import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    OrderPayment: localStorage.getItem('OrderPayment') ? JSON.parse(localStorage.getItem('OrderPayment')) : null,
};

const OrderPaymentSlice = createSlice({
    name: 'orderPayment',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.OrderPayment = action.payload;
            localStorage.setItem('OrderPayment', JSON.stringify(action.payload));
        },
        clear: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, clear } = OrderPaymentSlice.actions;
export default OrderPaymentSlice.reducer;
