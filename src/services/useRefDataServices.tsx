import {useConfig} from "./useConfig";
import axios from "axios";

export const useRefData = (): {
    getStates: () => Promise<any[]>
} => {
    const { endpoint } = useConfig();

    const getStates = async () => {
        try {
            const { data } = await axios.get(`${endpoint}states`);
            console.log('test value:', data)
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }

    return { getStates };
};
