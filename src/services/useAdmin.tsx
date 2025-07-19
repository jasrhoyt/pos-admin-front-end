import {useConfig} from "./useConfig";
import axios from "axios";


export const useAdmin = (): {
    getStates: () => Promise<any[]>
    postAdmin: (
        firstName: string,
        lastName: string,
        companyName: string,
        email: string,
        password: string,
        streetAddress: string,
        city: string,
        state: string,
        zipcode: string,
        phoneNumber: string
    ) => Promise<any>
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
    const postAdmin = async (
        firstName: string,
        lastName: string,
        companyName: string,
        email: string,
        password: string,
        streetAddress: string,
        city: string,
        state: string,
        zipcode: string,
        phoneNumber: string
    ) => {
        try {
            const { data } = await axios.post(`${endpoint}admin`, {
                first_name: firstName,
                last_name: lastName,
                company_name: companyName,
                email,
                password,
                address: {
                    street_address: streetAddress,
                    city,
                    state,
                    zipcode
                },
                phone_number: phoneNumber
            });
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

    return { getStates, postAdmin };
};
