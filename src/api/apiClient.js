const BASE_URL = "http://localhost:3002";

async function request(endpoint, options = {}) {
  const { apiParams, headers: customHeaders, ...restOptions } = options;
  let url = `${BASE_URL}${endpoint}`;

  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?${queryString}`;
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  return response.json();
}

export const apiClient = {
  get: (endpoint, apiParams = {}) => request(endpoint, { apiParams }),
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
