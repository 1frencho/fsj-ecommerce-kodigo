export interface NavItem {
  name: string;
  to: string;
}

export const navItems: NavItem[] = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Reviews', to: '/productReviews' },
];

interface PopOverItem {
  name: string;
  description: string;
  to: string;
}

export const adminItemNav: PopOverItem[] = [
  {
    name: 'Products',
    description: 'Manage products as an admin',
    to: '/admin/products',
  },
];
