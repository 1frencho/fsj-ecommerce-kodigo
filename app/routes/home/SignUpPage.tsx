// import type { Route } from './+types/home';

import { lazy } from 'react';

const SignOverview = lazy(() => import('@/sections/auth/SignOverview'));

// export function meta({data}: Route.MetaArgs) {
export function meta() {
  return [
    { title: 'Sign Up | Ecommerce Store' },
    { name: 'description', content: 'Sign Up to Ecommerce Store' },
  ];
}

export default function SignInPage() {
  return (
    <>
      <SignOverview type="signUp" />
    </>
  );
}
