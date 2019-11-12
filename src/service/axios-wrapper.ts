import { AxiosResponse } from "axios";

/**
 * Handles all axiosFunctions
 * @param {*} axiosFunc 
 */
export default async (responsePromise: Promise<AxiosResponse>): Promise<AxiosResponse|undefined> => {
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
