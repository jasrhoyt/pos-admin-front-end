import axios from "axios"

export const useConfig = () => {
    axios.defaults.withCredentials = true;

    return {
        endpoint: "http://localhost:8000/",
        axiosConfig: {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
            },
        },
    };
};