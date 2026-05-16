import axios, { AxiosInstance } from "axios";

export default class BaseClient {
  protected readonly axiosClient: AxiosInstance;

  constructor(
    baseURL: string,
    headers?: Record<string, string | number | object>,
  ) {
    this.axiosClient = axios.create({ baseURL, headers });
  }

  protected async get<T>(
    url: string,
    params?: Record<string, string | number | object>,
  ): Promise<T | null> {
    try {
      const response = await this.axiosClient.get<T>(url, { params });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  protected async post<T>(
    url: string,
    body: Record<string, string | number | object>,
  ): Promise<T | null> {
    try {
      const response = await this.axiosClient.post<T>(url, { body });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
