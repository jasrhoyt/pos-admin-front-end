import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userId: 0,
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: {
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateAddress: (state, action) => {
            state.address = {
                ...state.address,
                ...action.payload,
            };
        },
        clearUser: () => initialState,
        getUser: (state) => state
    },
});

export const {
    setUser,
    getUser,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;