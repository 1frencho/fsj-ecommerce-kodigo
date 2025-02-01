import { Button } from '@/components/ui/button';
import { Form, Input, type FormProps } from 'antd';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { signIn } from '@/lib/apiEcommerce';
import type { SignInErrorsInterface } from '@/interfaces/auth.interfaces';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';

// Define the form values interface
interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useAuth(true);

  const navigate = useNavigate();

  const onFinish: FormProps<FormValues>['onFinish'] = async (values) => {
    setIsLoading(true);

    try {
      const response = await signIn(values.email, values.password);

      if (
        response?.message !== 'User logged in successfully' ||
        !response?.token
      ) {
        toast.error('There was an error while signing in');
        return;
      }

      setToken(response.token);
      navigate('/products');
      toast.success('You have successfully signed in');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessages = error.response?.data as SignInErrorsInterface;

        if (errorMessages?.message) {
          toast.error(errorMessages.message);
          return;
        }

        toast.error('There was an error while signing in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form<FormValues>
      name="signIn"
      className="w-full space-y-1"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      {/* Email Field */}
      <Form.Item<FormValues>
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email address' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input
          size="large"
          placeholder="E.g. john@email.com"
          className="w-full"
        />
      </Form.Item>

      {/* Password Field */}
      <Form.Item<FormValues>
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { min: 6, message: 'Password must be at least 6 characters long' },
        ]}
        className="pb-4"
      >
        <Input.Password size="large" className="w-full" />
      </Form.Item>

      {/* Submit Button */}
      <Button
        type="submit"
        className="myPrimaryBtn w-full justify-center"
        disabled={!!isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : `Sign In`}
      </Button>

      {/* Link to Sign Up */}
      <p className="text-center text-sm">
        Don’t have an account?{' '}
        <Link to={'/signUp'} className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </Form>
  );
}

export default SignInForm;
