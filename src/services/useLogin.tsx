import axios from "axios"
import {useConfig} from "./useConfig";

export const useLogin = (): {
    login: (email: string, password: string) => Promise<boolean>
} => {

    const { endpoint, axiosConfig } = useConfig()

    return {
        login: async (email: string, password: string) => {
            try {
                const { data } = await axios.post(`${endpoint}login/`, { email, password })
                return data
            } catch (e: any) {
                return e.response.data
            }
        }
    }
}
