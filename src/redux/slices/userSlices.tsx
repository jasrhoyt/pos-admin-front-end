import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user_id: null,
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
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
    },
});

export const {
    setUser,
    clearUser,
} = userSlice.actions;

export default userSlice.reducer;