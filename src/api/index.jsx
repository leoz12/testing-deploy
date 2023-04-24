import { baseAPI } from "../config/apiService";

export const api = {
  getProducts: () => {
    return baseAPI.get(`/products`);
  },
  getProductById: (id) => {
    return baseAPI.get(`/products/${id}`);
  },
  createProduct: (body) => {
    return baseAPI.post(`/products`, body);
  },
  updateProduct: (id, body) => {
    return baseAPI.put(`/products/${id}`, body);
  },
  deleteProduct: (id) => {
    return baseAPI.delete(`/products/${id}`);
  },
};
