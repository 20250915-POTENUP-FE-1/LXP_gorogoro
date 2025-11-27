import { apiClient } from "./apiClient.js";

const BASE_URL = "http://localhost:3001";
const CATEGORIES_RESOURCE_PATH = "categories";

// apiClient 없이 기존 방식대로 fetch.then(json반환)
const getAllCategories = async () => {
  const response = await fetch(`${BASE_URL}/${CATEGORIES_RESOURCE_PATH}`);
  const data = await response.json();
  console.log(data);
  return data;
};

const categoryAPI = {
  getAllCategories: () => apiClient.get(`/${CATEGORIES_RESOURCE_PATH}`),
};

export default categoryAPI;
