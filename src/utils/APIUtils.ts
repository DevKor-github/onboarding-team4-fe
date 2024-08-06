import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

export interface APIResponse<T> {
  message: string;
  data: T;
}

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleAxiosError = async <T>(callback: <T>() => Promise<APIResponse<T>>):Promise<T> => {
  try {
    const response : APIResponse<T> = await callback();
    console.log(response.message);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
    }
    throw error;
  }
}

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return await handleAxiosError<T>(async <T>()=>{
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  });
};

export const postData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return handleAxiosError<T>(async <T>()=>{
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  })
};

export const putData = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return handleAxiosError<T>(async <T>()=>{
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  });
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return handleAxiosError<T>(async <T>()=>{
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  });
};
