// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     fullname: '',
//     email: '',
//     numberphone: '',
//     // address: '',
//     // avatar: '',
//     accessToken: '',
//     // district: '',
//     // id: '',
//     isAdmin: false,
//     // city: '',
//     // refreshToken: '',
//     // createdAt: '',
// };

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         updateUser: (state, action) => {
//             const {
//                 fullname = '',
//                 email = '',
//                 // address = '',
//                 // district = '',
//                 numberphone = '',
//                 // avatar = '',
//                 // _id = '',
//                 isAdmin,
//                 accessToken,
//                 // city = '',
//                 // refreshToken = '',
//                 // createdAt,
//             } = action.payload;
//             state.fullname = fullname ? fullname : state.name;
//             state.email = email ? email : state.email;
//             // state.address = address ? address : state.address;
//             // state.district = district ? district : state.district;
//             state.numberphone = numberphone ? numberphone : state.phone;
//             // state.avatar = avatar ? avatar : state.avatar;
//             // state.id = _id ? _id : state.id;
//             state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
//             // state.accessToken = accessToken ? accessToken : state.accessToken;
//             if (accessToken) {
//                 state.accessToken = accessToken; // Cập nhật accessToken chỉ khi nó có sẵn
//             }
//             // state.city = city ? city : state.city;
//             // state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
//             // state.createdAt = createdAt ? createdAt : state.createdAt;
//         },

//         resetUser: (state) => {
//             // state.id = '';
//             state.fullname = '';
//             state.email = '';
//             state.numberphone = '';
//             // state.address = '';
//             // state.district = '';
//             // state.avatar = '';
//             state.accessToken = '';
//             state.isAdmin = false;
//             // state.city = '';
//         },
//     },
// });
// export const { updateUser, resetUser } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullname: '',
    email: '',
    numberphone: '',
    // address: '',
    // avatar: '',
    accessToken: '',
    // district: '',
    _id: '',
    isAdmin: true,
    // city: '',
    // refreshToken: '',
    // createdAt: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                fullname = '',
                email = '',
                accessToken = '',
                // address = '',
                // district = '',
                numberphone = '',
                // avatar = '',
                _id = '',
                isAdmin,
                // city = '',
                // refreshToken = '',
                // createdAt,
            } = action.payload;
            state.fullname = fullname ? fullname : state.name;
            state.email = email ? email : state.email;
            // state.address = address ? address : state.address;
            // state.district = district ? district : state.district;
            state.numberphone = numberphone ? numberphone : state.phone;
            // state.avatar = avatar ? avatar : state.avatar;
            state._id = _id ? _id : state._id;
            state.accessToken = accessToken ? accessToken : state.accessToken;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            // state.city = city ? city : state.city;
            // state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
            // state.createdAt = createdAt ? createdAt : state.createdAt;
        },

        resetUser: (state) => {
            state._id = '';
            state.fullname = '';
            state.email = '';
            state.numberphone = '';
            // state.address = '';
            // state.district = '';
            // state.avatar = '';
            state.accessToken = '';
            state.isAdmin = true;
            // state.city = '';
        },
    },
});
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
