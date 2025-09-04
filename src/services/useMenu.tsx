import {useConfig} from "./useConfig";
import axios from "axios";

export const useMenu = (): {
    getMenu: (restaurantId?: number) => Promise<[]>;
    postMenuCategory: (
        categoryName: string,
        restaurantId: number,
    ) => Promise<any>
} => {
    const { endpoint } = useConfig();
    const getMenu = async (
        restaurantId?: number
    ) => {
        try {
            const { data } = await axios.get(`${endpoint}menu`, { params: { restaurant_id: restaurantId } });
            return data.restaurants;
        } catch (e: any) {
            return e.response.data;
        }
    }
    const postMenuCategory = async (
        categoryName: string,
        restaurantId: number,
    ) => {
        try {
            const { data } = await axios.post(`${endpoint}category`, {
                categoryName,
                restaurantId,
            });
            return data;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getMenu, postMenuCategory };
};