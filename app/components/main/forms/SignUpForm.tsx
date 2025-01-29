import { Button } from '@/components/ui/button';
import type { SignUpErrorsInterface } from '@/interfaces/api.interfaces';
import { signUp } from '@/lib/apiEcommerce';
import { Form, Input, type FormProps } from 'antd';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

// Define the form values interface
interface FormValues {
  fullName: string;
  email: string;
  password: string;
}

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish: FormProps<FormValues>['onFinish'] = async (values) => {
    setIsLoading(true);
    try {
      const response = await signUp({
        name: values.fullName,
        email: values.email,
        password: values.password,
      });
      if (
        response?.message !== 'User created successfully' ||
        !response?.user?.id
      ) {
        toast.error('There was an error while signing up');
        return;
      }

      navigate('/signIn');
      toast.success('You have successfully signed up');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessages = error.response?.data as SignUpErrorsInterface;

        if (errorMessages?.error?.email) {
          toast.warning(errorMessages.error.email[0]);
          return;
        }

        if (errorMessages?.error?.name) {
          toast.warning(errorMessages.error.name[0]);
          return;
        }

        if (errorMessages?.error?.password) {
          toast.warning(errorMessages.error.password[0]);
          return;
        }

        toast.error('There was an error while signing up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form<FormValues>
      name="signUp"
      className="w-full space-y-1"
      onFinish={onFinish}
      layout="vertical"
    >
      {/* Full Name Field */}
      <Form.Item<FormValues>
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input size="large" placeholder="E.g. John Doe" className="w-full" />
      </Form.Item>

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
        {isLoading ? <Loader2 className="animate-spin" /> : `Sign up`}
      </Button>

      {/* Link to Sign In */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to={'/signIn'} className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Form>
  );
}

export default SignUpForm;
