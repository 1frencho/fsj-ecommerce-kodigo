import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import type { RootState } from '@/stores';
import {
  authClear,
  authFailure,
  authSuccess,
  logout,
  type AuthUserState,
} from '@/stores/auth.slice';
import { apiEcommerce, getMyUser } from '@/lib/apiEcommerce';

const { NODE_ENV } = import.meta.env;

/*
  1st USAGE: Fetch is done, don't execute the useEffect again by setting execute to false
    const { session, signOut } = useAuth(false);

  2nd USAGE:
  USAGE: 
    const { loading, user, userToken } = useSelector(
    (state: RootState) => state.auth,
  );
*/

function useAuth(execute = true) {
  const dispatch = useDispatch();
  const { session, loading } = useSelector((state: RootState) => state.auth);

  // Manage cookies using react-cookie
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const jwtToken = cookies.token as string | undefined;

  // Ref to track API call to prevent multiple executions
  const hasFetchedUser = useRef(false);

  /*
    Function to set the authentication token in cookies
    - Removes the previous token before setting the new one
    - Secure cookie settings enabled for production environments
  */
  const setToken = (token: string) => {
    apiEcommerce.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    removeCookie('token', { path: '/' });
    setCookie('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
      secure: NODE_ENV === 'production',
    });
  };

  /*
    Function to store user data in cookies
    - Stores user as a JSON string
  */
  const setUser = (user: AuthUserState) => {
    removeCookie('user', { path: '/' });
    setCookie('user', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
      secure: NODE_ENV === 'production',
    });
  };

  /*
    Function to update the Redux state with authenticated user data
    - Stores the user and token in cookies
    - Dispatches the authentication success action
  */
  const handleUpdateState = (jwtToken: string, response: AuthUserState) => {
    setToken(jwtToken);
    setUser({
      user: response.user,
      token: jwtToken,
    });

    dispatch(
      authSuccess({
        token: jwtToken,
        user: response.user,
      }),
    );
  };

  /*
    Logout function
    - Clears the authentication token and user from cookies
    - Dispatches the logout action to reset Redux state
  */
  const signOut = useCallback(() => {
    delete apiEcommerce.defaults.headers.common['Authorization'];
    removeCookie('user', { path: '/' });
    removeCookie('token', { path: '/' });
    dispatch(logout());
    hasFetchedUser.current = false; // Reset ref when logging out
  }, [removeCookie, dispatch]);

  /*
    useEffect to set API Authorization header when jwtToken changes
  */
  useEffect(() => {
    if (jwtToken) {
      apiEcommerce.defaults.headers.common['Authorization'] =
        `Bearer ${jwtToken}`;
    } else {
      delete apiEcommerce.defaults.headers.common['Authorization'];
    }
  }, [jwtToken]);

  /*
    useEffect to check user authentication state
    - Executes only if 'execute' is true and a valid JWT token exists
    - Prevents multiple redundant calls using a ref
  */
  useEffect(() => {
    if (!execute) return;

    if (!jwtToken || jwtToken.length < 30) {
      dispatch(authClear());
      return;
    }

    if (hasFetchedUser.current) return;
    hasFetchedUser.current = true; // Prevent duplicate fetches

    getMyUser()
      .then((response) => {
        if (jwtToken && response?.user?.id) {
          handleUpdateState(jwtToken, {
            user: response?.user,
            token: jwtToken,
          });
        }
      })
      .catch((error) => {
        dispatch(authFailure(error.message));
        console.error('Authentication error:', error);
        hasFetchedUser.current = false; // Allow retrying on failure
      });
  }, [jwtToken, dispatch, execute]);

  return {
    setToken,
    signOut,
    session,
    loading,
  };
}

export default useAuth;
