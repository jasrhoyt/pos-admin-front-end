import axios from "axios"
import {useConfig} from "./useConfig";

export const useLogin = (): {
    login: (email: string, password: string) => Promise<boolean>
} => {

    const { endpoint, axiosConfig } = useConfig()

    return {
        login: async (email: string, password: string) => {
            console.log("test value")
            try {
                const { data } = await axios.post(`${endpoint}login/`, { email: email, password: password })
                console.log('2 test value:', data)
                return data
            } catch (e: any) {
                console.log("3 test value", e)
            }
        }
    }
}
