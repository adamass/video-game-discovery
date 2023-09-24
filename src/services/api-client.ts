import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'ed6cd85864f444bb9a5b77be4031addb'
    }
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
        .get<FetchResponse<T>>(this.endpoint, config)
        .then(response => response.data)
    }

    // post = (data: T) => {
    //     return axiosInstance
    //     .post<T>(this.endpoint, data)
    //     .then(response => response.data)
    // }
}
export default APIClient;