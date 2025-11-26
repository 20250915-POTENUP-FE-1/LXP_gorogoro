const BASE_URL = "http://localhost:3001";
const CATEGORIES_RESOURCE_PATH = "courses";

const categoryAPI = {
  getAllCategories: async () => {
    const response = await fetch(`${BASE_URL}/${CATEGORIES_RESOURCE_PATH}`);
    const data = await response.json();
    console.log(data);
    return data;
  },
};

categoryAPI.getAllCategories();
