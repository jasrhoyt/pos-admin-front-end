import {useConfig} from "./useConfig";
import axios from "axios";


export const useAdmin = (): {
    getStates: () => Promise<any[]>
} => {
    const { endpoint } = useConfig();

    const getStates = async () => {
        try {
            const { data } = await axios.get(`${endpoint}states`);
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getStates };
};
