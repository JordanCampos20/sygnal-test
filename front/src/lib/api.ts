export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    ORDER: "/api/v1/order",
  },
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`

    const headers = {
        ...API_CONFIG.HEADERS,
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'API request failed');
    }

    return response.json() as Promise<T>;
}