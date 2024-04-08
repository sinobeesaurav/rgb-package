import { AxiosRequestConfig } from "axios";
declare class apiUtility {
    private axiosInstance;
    constructor(baseURL: string);
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any, Body = any>(url: string, data?: Body, config?: AxiosRequestConfig): Promise<T>;
    private handleError;
}
export default apiUtility;
