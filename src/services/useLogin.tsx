import axios from "axios"
import {useConfig} from "./useConfig";

export const useLogin = (): {
    login: (email: string, password: string) => Promise<any>,
    postAdmin: (
        firstName: string | undefined,
        lastName: string | undefined,
        companyName: string | undefined,
        email: string | undefined,
        password: string | undefined,
        streetAddress: string | undefined,
        city: string | undefined,
        state: string | undefined,
        zipcode: string | undefined,
        phoneNumber: string | undefined
    ) => Promise<any>
} => {

    const { endpoint, axiosConfig } = useConfig()

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
            firstName: string | undefined,
            lastName: string | undefined,
            companyName: string | undefined,
            email: string | undefined,
            password: string | undefined,
            streetAddress: string | undefined,
            city: string | undefined,
            state: string | undefined,
            zipcode: string | undefined,
            phoneNumber: string | undefined
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
