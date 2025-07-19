import axios from "axios"
import {useConfig} from "./useConfig";

export const useLogin = (): {
    login: (email: string, password: string) => Promise<any>,
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

    const { endpoint } = useConfig()

    return {
        login: async (email: string, password: string) => {
            try {
                const { data } = await axios.post(`${endpoint}login`, { email, password })
                return data
            } catch (e: any) {
                return e.response.data
            }
        },
        postAdmin: async (
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
    }
}
