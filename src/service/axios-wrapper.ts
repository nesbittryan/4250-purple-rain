import axios, { AxiosRequestConfig } from 'axios';

import { AxiosResponse } from "axios";

export const get = async function (url: string): Promise<AxiosResponse | undefined> {
    return await handleAxiosError(axios.get(url))
}

export const post = async function (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
    return await handleAxiosError(axios.post(url, data, config))
}

export const put = async function (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
    return await handleAxiosError(axios.put(url, data, config))
}

/**
 * Handles all axiosFunctions
 * @param {*} axiosFunc 
 */
const handleAxiosError = async (responsePromise: Promise<AxiosResponse>): Promise<AxiosResponse|undefined> => {
    try {
        const response =  await responsePromise;
        console.info(response);
        return response;
    } catch (error) {
        if (error.response) {
            // Something wrong with the response
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // Something wrong with the request
            console.log(error.request);
        } else {
            // Something else wrong
            console.log('Error', error.message);
        }
        console.log(error);
        // Pass back the response we got from the message,
        // we might be able to use it to display an error message to the user.
        console.log('returning')
        console.log(error.response)
        return error.response;
    }
}
