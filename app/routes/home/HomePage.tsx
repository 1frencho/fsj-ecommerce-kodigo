import { lazy } from 'react';

const MainHero = lazy(() => import('@/sections/home/MainHero'));
const QuickBanner = lazy(() => import('@/sections/home/QuickBanner'));
const SearchFeatures = lazy(() => import('@/sections/home/SearchFeatures'));

// export function meta({data}: Route.MetaArgs) {
export function meta() {
  return [
    { title: 'Home | Ecommerce Store' },
    { name: 'description', content: 'Welcome to Ecommerce Store' },
  ];
}

export default function HomePage() {
  return (
    <>
      <MainHero />
      <QuickBanner />
      <SearchFeatures />
    </>
  );
}
