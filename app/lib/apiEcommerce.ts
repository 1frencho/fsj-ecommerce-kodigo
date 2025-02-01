import type { Product } from '@/components/main/cards/ProductCard';
import type { Rating } from '@/components/main/cards/RatingCard';
import type {
  SignUp,
  UserAuthenticated,
  UserMe,
  UserRegistered,
} from '@/interfaces/auth.interfaces';
import axios from 'axios';

export const apiEcommerce = axios.create({
  baseURL:
    import.meta.env.VITE_API_ECOMMERCE ||
    'http://api-ecommerce.frencho.dev/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = (url: string) =>
  apiEcommerce.get(url).then((res) => res.data);

export const signUp = async (data: SignUp): Promise<UserRegistered> => {
  const response = await apiEcommerce.post('/auth/sign_up', data);
  return response.data;
};

export const signIn = async (
  email: string,
  password: string,
): Promise<UserAuthenticated> => {
  const response = await apiEcommerce.post('/auth/sign_in', {
    email,
    password,
  });
  return response.data;
};

export const getMyUser = async (): Promise<{
  user: UserMe;
  message: string;
}> => {
  const response = await apiEcommerce.get('/auth/me');
  return response.data;
};

export interface ProductFilters {
  name?: string;
  // description?: string;
  min_price?: number;
  max_price?: number;
  // min_stock?: number;
  // max_stock?: number;
  is_active?: boolean;
  sort_by?:
    | 'name'
    | 'price'
    | 'stock'
    | 'is_active'
    | 'average_rating'
    | 'none';
  sort_order?: 'desc' | 'asc' | 'none';
  // start_date?: string;
}

export const getPublicProducts = async ({
  is_active,
  max_price,
  min_price,
  name,
  sort_by,
  sort_order,
}: ProductFilters): Promise<Product[]> => {
  const response = await apiEcommerce.get('/v1/products', {
    params: {
      is_active,
      max_price,
      min_price,
      name,
      sort_by,
      sort_order,
    },
  });
  return response.data;
};

export const getSingleProductById = async (id: number): Promise<Product> => {
  const response = await apiEcommerce.get(`/v1/products/${id}`);
  return response.data;
};

export const rateProduct = async ({
  // user_id,
  product_id,
  quantity,
  comment,
}: {
  // user_id: number;
  product_id: number;
  quantity: number;
  comment: string;
}): Promise<{ message: 'Valoracion ingresada correctamente' }> => {
  const response = await apiEcommerce.post('/v1/vauling_product', {
    // user_id,
    product_id,
    quantity,
    comment,
  });
  return response.data;
};

export const getRatings = async (): Promise<Rating[]> => {
  const response = await apiEcommerce.get('/v1/valuing_product');
  return response.data;
};

export const getProductRatingsById = async (
  product_id: number,
): Promise<Rating[]> => {
  const response = await apiEcommerce.get(`/v1/valuing_product/${product_id}`);
  return response.data;
};
