// Sign Up requests.

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface UserRegistered {
  message: 'User created successfully';
  user: UserRecord;
}

export interface UserRecord {
  name: string;
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface SignUpErrorsInterface {
  error: SignUpErrors;
}

export type EmailErrors = 'The email has already been taken.';
export interface SignUpErrors {
  email: EmailErrors[];
  name: string[];
  password: string[];
}

// Sign In requests.

export type AuthErrors = 'Invalid credentials';

export interface SignInErrorsInterface {
  message: AuthErrors;
}

export interface UserAuthenticated {
  message: 'User logged in successfully';
  token: string;
  expiration: number;
}
