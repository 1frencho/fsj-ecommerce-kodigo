import { Loader } from '@/components/main/content/Loader';
import { isRouteErrorResponse, Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import type { Route } from './+types/HomeLayout';
import { FaWebAwesome } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores';

function HomeLayout({ notFound }: { notFound?: boolean }) {
  const { loading } = useSelector((state: RootState) => state.auth);
  if (loading) return null;
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Loader animation="slideFade" timeout={150}>
          {notFound ? (
            <div className="flex flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8">
              <h1>404</h1>
              <p>The requested page could not be found.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </Loader>
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <Header />
      <Loader animation="slideFade" timeout={150}>
        <div className="flex h-[88vh] flex-col items-center justify-center gap-4 p-4 md:p-8">
          <FaWebAwesome size={40} className="text-primary" />
          <h2 className="text-3xl font-extrabold text-primary">{message}</h2>
          <p>{details}</p>
          {stack && (
            <pre className="w-full overflow-x-auto p-4">
              <code>{stack}</code>
            </pre>
          )}
        </div>
      </Loader>
    </>
  );
}

export default HomeLayout;
