import axios from "axios"
import {useConfig} from "./useConfig";

export const useLogin = (): {
    login: (email: string, password: string) => Promise<any>,
    postAdmin: (firstName: string, lastName: string, companyName: string, email: string, password: string) => Promise<any>
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
        postAdmin: async (firstName: string, lastName: string, companyName: string, email: string, password: string) => {
            try {
                const { data } = await axios.post(`${endpoint}admin`, { email, password })
                return data
            } catch (e: any) {
                return e.response.data
            }
        }
    }
}
