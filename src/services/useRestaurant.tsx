import {useConfig} from "./useConfig";
import axios from "axios";

export const useRestaurant = (): {
    getRestaurants: (adminId?: number) => Promise<[]>;
    postRestaurants: (
        restaurantName: string,
        useAddressOnFile: boolean,
        address: {
            street_address: string;
            city: string;
            state: string;
            zipcode: string
        } | null
    ) => Promise<any>
} => {
    const { endpoint } = useConfig();
    const getRestaurants = async (
        adminId?: number
    ) => {
        try {
            const { data } = await axios.get(`${endpoint}restaurants`, { params: { admin_id: adminId } });
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }
    const postRestaurants = async (
        restaurantName: string,
        useAddressOnFile: boolean = false,
        address: {
            street_address: string,
            city: string,
            state: string,
            zipcode: string,
        } | null,
    ) => {
        try {
            const { data } = await axios.post(`${endpoint}restaurants`, {
                restaurant_name: restaurantName,
                use_address_on_file: useAddressOnFile,
                address
            });
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getRestaurants, postRestaurants };
};