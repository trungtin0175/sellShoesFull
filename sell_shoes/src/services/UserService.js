import axios from 'axios';

export const loginUser = async (user) => {
    const res = await axios.post('http://localhost:3000/api/login', user);
    console.log(res);
    // return res.data;
    return res.data.user;
};

export const registerUser = async (user) => {
    try {
        const res = await axios.post('http://localhost:3000/api/signup', user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
// export const loginUser = async (user) => {
//     const res = await axios.post('http://localhost:3000/api/login', user);
//     console.log(res);
//     // return res.data.user;
//     return res.data;
// };

// export const registerUser = async (user) => {
//     try {
//         const res = await axios.post('http://localhost:3000/api/signup', user);
//         return res.data;
//     } catch (err) {
//         console.log(err);
//     }
// };
