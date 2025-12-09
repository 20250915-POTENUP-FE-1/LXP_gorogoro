const BASE_URL = "http://localhost:3002/api/v1";

export const get = async (endpoint: string, apiParams?: any) => {
  let url = `${BASE_URL}/${endpoint}`;
  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?/${queryString}`;
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
  if (!res.ok) throw new Error(`POST FAILED: ${res.status}`);
  return res.json();
};

export const put = async (endpoint: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT FAILED: ${res.status}`);
  return res.json();
};

export const del = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`DELETE FAILED: ${res.status}`);
  return res.json();
};
