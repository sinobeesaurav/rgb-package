import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import ChainOperationError from "../errors/ChainOperationError";

class apiUtility {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T = any, Body = any>(
    url: string,
    data: Body = {} as Body,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      // Check if server responded with a specific error message
      if (response?.data?.detail) {
        return new ChainOperationError(
          "internal Api call error",
          "RGB",
          response.data.detail || error?.response?.data.detail
        );
      }
      return new ChainOperationError(
        "internal Api call error",
        "RGB",
        error.message
      );
    } else {
      // Handle other errors (e.g., network errors)
      return new ChainOperationError(
        "internal Api call",
        "RGB",
        "An unknown error occurred"
      );
    }
  }
}

export default apiUtility;
