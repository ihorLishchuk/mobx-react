import { API_BASE } from "./config";

export default class ApiGateway {
  async request(path, options = {}) {
    const url = `${API_BASE}${path}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const finalOptions = {
      headers: defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, finalOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("ApiGateway Error:", error);
      throw error;
    }
  }

  get(path) {
    return this.request(path, {
      method: "GET",
    });
  }

  post(path, payload) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  put(path, payload) {
    return this.request(path, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  delete(path) {
    return this.request(path, {
      method: "DELETE",
    });
  }
}