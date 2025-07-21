import {useConfig} from "./useConfig";
import axios from "axios";
import {toNullIfEmpty} from "./utilities";
import {IRestaurantState} from "../redux/selectors/restaurantSelector";

export const useRestaurant = (): {
    getRestaurants: (adminId?: number) => Promise<IRestaurantState[]>;
    postRestaurants: (
        adminId: number,
        restaurantName: string,
        restaurantEmail: string,
        phoneNumber: string,
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
            return data.restaurants;
        } catch (e: any) {
            return e.response.data;
        }
    }
    const postRestaurants = async (
        adminId: number,
        restaurantName: string,
        restaurantEmail: string,
        phoneNumber: string,
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
                adminId,
                restaurantName: toNullIfEmpty(restaurantName),
                restaurantEmail: toNullIfEmpty(restaurantEmail),
                phoneNumber: toNullIfEmpty(phoneNumber),
                useAddressOnFile,
                address: address
                    ? {
                        streetAddress: toNullIfEmpty(address.streetAddress),
                        city: toNullIfEmpty(address.city),
                        state: toNullIfEmpty(address.state),
                        zipcode: toNullIfEmpty(address.zipcode),
                    }
                    : null,
            });
            return data;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getRestaurants, postRestaurants };
};