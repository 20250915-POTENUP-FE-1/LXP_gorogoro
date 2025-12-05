import { apiClient } from "./apiClient.js";

const CATEGORIES_RESOURCE_PATH = "categories";

const categoryAPI = {
  getAllCategories: () => apiClient.get(`/${CATEGORIES_RESOURCE_PATH}`),
};

export default categoryAPI;
