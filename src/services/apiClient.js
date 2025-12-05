<<<<<<< HEAD
const BASE_URL = "http://localhost:3001";

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
=======
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

>>>>>>> 236355f8ca18f228c4c54f82f0fecff32ea9c23a
  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  return response.json();
}

export const apiClient = {
<<<<<<< HEAD
  get: (endpoint) => request(endpoint),
=======
  get: (endpoint, apiParams = {}) => request(endpoint, { apiParams }),
>>>>>>> 236355f8ca18f228c4c54f82f0fecff32ea9c23a
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
