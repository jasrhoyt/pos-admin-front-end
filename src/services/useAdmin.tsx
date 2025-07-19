import {useConfig} from "./useConfig";
import axios from "axios";
import {toNullIfEmpty} from "./utilities";


export const useAdmin = (): {
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
                first_name: toNullIfEmpty(firstName),
                last_name: toNullIfEmpty(lastName),
                company_name: toNullIfEmpty(companyName),
                email: toNullIfEmpty(email),
                password: toNullIfEmpty(password),
                address: {
                    street_address: toNullIfEmpty(streetAddress),
                    city: toNullIfEmpty(city),
                    state: toNullIfEmpty(state),
                    zipcode: toNullIfEmpty(zipcode),
                },
                phone_number: toNullIfEmpty(phoneNumber)
            });
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

    return {postAdmin };
};
