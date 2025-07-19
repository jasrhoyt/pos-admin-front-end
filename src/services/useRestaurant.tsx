import {useConfig} from "./useConfig";
import axios from "axios";
import {toNullIfEmpty} from "./utilities";

export const useRestaurant = (): {
    getRestaurants: (adminId?: number) => Promise<[]>;
    postRestaurants: (
        adminId: number,
        restaurantName: string,
        restaurantEmail: string,
        useAddressOnFile: boolean,
        address: {
            streetAddress: string;
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
        adminId: number,
        restaurantName: string,
        restaurantEmail: string,
        useAddressOnFile: boolean = false,
        address: {
            streetAddress: string,
            city: string,
            state: string,
            zipcode: string,
        } | null,
    ) => {
        try {
            const { data } = await axios.post(`${endpoint}restaurants`, {
                admin_id: adminId,
                restaurant_name: toNullIfEmpty(restaurantName),
                restaurant_email: toNullIfEmpty(restaurantEmail),
                use_address_on_file: useAddressOnFile,
                address: address
                    ? {
                        street_address: toNullIfEmpty(address.streetAddress),
                        city: toNullIfEmpty(address.city),
                        state: toNullIfEmpty(address.state),
                        zipcode: toNullIfEmpty(address.zipcode),
                    }
                    : null,
            });
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getRestaurants, postRestaurants };
};