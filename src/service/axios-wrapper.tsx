import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage'


export const get = async function (url: string): Promise<AxiosResponse | undefined> {
    console.log(url)
    return await handleAxiosError(axios.get(url, await getHeaders()))
}

export const getNoHeaders = async function (url: string): Promise<AxiosResponse | undefined> {
    console.log(url)
    return await handleAxiosError(axios.get(url))
}

export const post = async function (url: string, data?: any): Promise<AxiosResponse | undefined> {
    console.log(url)
    return await handleAxiosError(axios.post(url, data, await getHeaders()))
}

export const postS3Headers = async function (url: string, data: any, headers:any): Promise<AxiosResponse | undefined> {
    console.log("url posting to: " + url)
    console.log("headers sent along: " + headers)
    return await handleAxiosError(axios.post(url, data, headers))
}

export const put = async function (url: string, data?: any): Promise<AxiosResponse | undefined> {
    console.log(url)
    return await handleAxiosError(axios.put(url, data, await getHeaders()))
}

const getHeaders = async () => {
    const token = await AsyncStorage.getItem('token')
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
    }
}


/**
 * Handles all axiosFunctions
 * @param {*} axiosFunc 
 */
const handleAxiosError = async (responsePromise: Promise<AxiosResponse>): Promise<AxiosResponse | undefined> => {
    try {
        const response = await responsePromise;
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
        console.log(error.response)
        return error.response;
    }
}
