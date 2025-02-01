import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('layouts/home/HomeLayout.tsx', [
    index('routes/home/HomePage.tsx'),
    route('products', './routes/home/ProductsPage.tsx'),
    route('product/:id', './routes/home/SingleProductPage.tsx'),
    route('signIn', './routes/home/SignInPage.tsx'),
    route('signUp', './routes/home/SignUpPage.tsx'),
    route('productReviews', './routes/home/ProductReviewsPage.tsx'),
    // PROTECTED ADMIN ROUTES
    layout('./components/main/auth/ProtectedAdmin.tsx', [
      ...prefix('admin', [
        route('products', './routes/admin/ManageProductsPage.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
