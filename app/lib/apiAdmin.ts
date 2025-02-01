import type { Product } from '@/components/main/cards/ProductCard';
import { apiEcommerce } from './apiEcommerce';

export const addProductApi = async (
  data: Product,
): Promise<{ message: 'Product added successfully'; product: Product }> => {
  const response = await apiEcommerce.post('/v1/admin/products', {
    ...data,
  });
  return response.data;
};

export const updateProductApi = async (
  id: number,
  data: Product,
): Promise<{ message: 'Product updated successfully'; product: Product }> => {
  const response = await apiEcommerce.patch(`/v1/admin/products/${id}`, data);
  return response.data;
};

export const removeProductApi = async (
  id: number,
): Promise<{ message: 'Product deleted successfully' }> => {
  const response = await apiEcommerce.delete(`/v1/admin/products/${id}`);
  return response.data;
};
