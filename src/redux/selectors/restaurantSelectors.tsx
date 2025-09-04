

export interface IRestaurantState {
    restaurantId?: number;
    restaurantName?: string;
    restaurantEmail?: string;
    restaurantPhoneNumber?: string;
}

export const selectRestaurant = (state: any): IRestaurantState => state.restaurant;