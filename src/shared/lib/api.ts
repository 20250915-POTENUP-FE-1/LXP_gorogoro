const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/v1";

export const get = async (endpoint: string, apiParams?: any) => {
  let url = `${BASE_URL}/${endpoint}`;

  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?${queryString}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET FAILED: ${res.status}`);
  return res.json();
};

export const post = async (endpoint: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  // if (!res.ok) throw new Error(`POST FAILED:${res.status}} `);
  if (!res.ok) {
    let errorBody = null;
    try {
      errorBody = await res.json(); //{ code, message }
    } catch {
      const error = {
        status: res.status,
        code: undefined,
        message: errorBody.message ?? "요청이 실패했습니다",
      };
      throw error;
    }
    const error = {
      status: res.status,
      code: errorBody.code,
      message: errorBody.message,
    };
    throw error;
  }
  return res.json();
};

export const patch = async (endpoint: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT FAILED: ${res.status}`);
  return res.json();
};

export const del = async (endpoint: string, body?: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DELETE FAILED: ${res.status}`);
  return res.json();
};
