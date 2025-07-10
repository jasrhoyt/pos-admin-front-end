import {useConfig} from "./useConfig";
import axios from "axios";
import { useCallback } from 'react';


export const useAdmin = (): {
    getStates: () => Promise<any[]>
} => {
    const { endpoint } = useConfig();

    const getStates = useCallback(async () => {
        try {
            const { data } = await axios.get(`${endpoint}states`);
            return data.states;
        } catch (e: any) {
            return e.response.data;
        }
    }, [endpoint]);

    return { getStates };
};
