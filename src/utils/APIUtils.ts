import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

interface APIResponse<T> {
  message: string;
  data: T;
}

/**
 * Returns the data from the APIResponse if the request is successful and when an error occurs, it logs the error
 * 
 * @remarks
 * This function is used to handle meta datas in APIResponse and return the data when the request is successful
 * When an error occurs, it handle the error in three cases: 
 * 1. The request was made and the server responded with a status code
 * 2. The request was made but no response was received
 * 3. Something happened in setting up the request that triggered an Error
 * 
 * @param callback - http request function that returns a APIResponse in a promise
 * @returns APIResponse.data returned by the callback
 */
const handleAxiosError = async <T>(callback: () => Promise<APIResponse<T>>):Promise<T> => {
  try {
    console.log("handleAxiosError");
    const response : APIResponse<T> = await callback();
    console.log("dsf",response.message);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
    console.error("error",error);
    throw error;
  }
}

/**
 * Makes a GET request to the specified URL and returns the data field inside the APIResponse
 * 
 * @param url - The URL to which the request is made
 * @param config - The config object that is used to make the request
 * @returns data field inside the APIResponse
 */
export const getData = async <T>(
  url: string,
  client: AxiosInstance,
  config?: AxiosRequestConfig,
): Promise<T> => {
  console.log("getData from", url);
  return await handleAxiosError<T>(async ()=>{
    const response = await client.get<APIResponse<T>>(url, config);
    console.log(response.data);
    return response.data;
  });
};

/**
 * Makes a POST request to the specified URL and returns the data field inside the APIResponse
 * 
 * @param url - The URL to which the request is made
 * @param data - The data to be sent to the server
 * @param config - The config object that is used to make the request
 * @returns data field inside the APIResponse
 */
export const postData = async <T, U>(
  url: string,
  client: AxiosInstance,
  data?: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  return await handleAxiosError<T>(async ()=>{
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  })
};


/**
 * Makes a PUT request to the specified URL and returns the data field inside the APIResponse
 * 
 * @param url - The URL to which the request is made
 * @param data - The data to be sent to the server
 * @param config - The config object that is used to make the request
 * @returns data field inside the APIResponse
 */
export const putData = async <T, U>(
  url: string,
  client: AxiosInstance,
  data?: U,
  config?: AxiosRequestConfig
): Promise<T> => {
  return await handleAxiosError<T>(async ()=>{
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  });
};

/**
 * Makes a DELETE request to the specified URL and returns the data field inside the APIResponse
 * 
 * @param url - The URL to which the request is made
 * @param config - The config object that is used to make the request
 * @returns data field inside the APIResponse
 */
export const deleteData = async <T>(
  url: string,
  client: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<T> => {
  return await handleAxiosError<T>(async ()=>{
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  });
};
