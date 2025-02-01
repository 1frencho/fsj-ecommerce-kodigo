import type { Product } from '@/components/main/cards/ProductCard';
import type {
  SignUp,
  UserAuthenticated,
  UserRegistered,
} from '@/interfaces/api.interfaces';
import axios from 'axios';

export const apiEcommerce = axios.create({
  baseURL:
    import.meta.env.VITE_API_ECOMMERCE ||
    'http://api-ecommerce.frencho.dev/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getPublicProducts = async (): Promise<Product[]> => {
  const response = await apiEcommerce.get('/v1/products');
  return response.data;
};
