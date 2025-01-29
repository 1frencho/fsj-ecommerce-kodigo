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

export const productsItemNav: PopOverItem[] = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    to: '#',
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    to: '#',
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    to: '#',
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    to: '#',
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    to: '#',
  },
];
