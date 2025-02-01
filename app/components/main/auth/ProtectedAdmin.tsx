import useAuth from '@/hooks/useAuth';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth(false);
  const navigate = useNavigate();

  // User authentication check
  const isAuthenticated = Boolean(session?.user?.id);
  // Check if user has admin role
  const isAdmin = session?.user?.role_id === 1;

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        toast.error('You must be logged in to access this page.');
        navigate('/signIn');
      } else if (!isAdmin) {
        // Redirect to home if not admin
        toast.error('Access denied: Admins only.');
        navigate('/');
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  // Show nothing while loading
  if (loading) return null;

  return isAuthenticated && isAdmin ? <>{children}</> : null;
}

export default ProtectedAdmin;
