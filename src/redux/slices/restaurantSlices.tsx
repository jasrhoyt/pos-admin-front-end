import {createSlice} from "@reduxjs/toolkit";
import {IRestaurantState} from "../selectors/restaurantSelector";


const initialState: IRestaurantState = {
    restaurantId: undefined,
    restaurantName: undefined,
    restaurantEmail: undefined,
    restaurantPhoneNumber: undefined,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action: any) => {
            return { ...state, restaurant: action.payload };
        }
    }
})

export const {
    setRestaurant
} = restaurantSlice.actions;

export default restaurantSlice.reducer;