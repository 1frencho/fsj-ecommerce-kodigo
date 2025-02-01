import type { Product } from '@/components/main/cards/ProductCard';
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

export const getPublicProducts = async (): Promise<Product[]> => {
  const response = await apiEcommerce.get('/v1/products');
  return response.data;
};
