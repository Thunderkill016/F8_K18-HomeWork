import axios from "../../plugins/axios";
import { toast } from "react-toastify";

interface Body {
  [key: string]: any;
}

class Api {
  private async getNewToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;

    const { data } = await axios.post("/auth/refresh-token", { refreshToken });
    localStorage.setItem("accessToken", data.accessToken);
  }

  private async request(
    method: string,
    endpoint: string,
    body: Body | null = null,
  ) {
    try {
      const { data } = await (axios as any)[method](endpoint, body);
      return data;
    } catch (e: any) {
      if (e.response?.data?.message === "token expired") {
        await this.getNewToken();
      }
      toast.error("request failed");
    }
  }

  async get(endpoint: string) {
    return await this.request("get", endpoint);
  }

  async post(endpoint: string, body: Body) {
    return await this.request("post", endpoint, body);
  }

  async put(endpoint: string, body: Body) {
    return await this.request("put", endpoint, body);
  }

  async delete(endpoint: string) {
    return await this.request("delete", endpoint);
  }
}
export const api = new Api();
