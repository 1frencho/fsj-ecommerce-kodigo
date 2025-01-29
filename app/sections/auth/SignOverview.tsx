import SignInForm from '@/components/main/forms/SignInForm';
import SignUpForm from '@/components/main/forms/SignUpForm';
import { MdCategory } from 'react-icons/md';

export type SignOverviewType = 'signIn' | 'signUp';

function SignOverview({ type }: { type: SignOverviewType }) {
  return (
    <>
      <div className="flex min-h-[92vh] flex-col items-center justify-center bg-primary-bg px-6 py-12 lg:px-8">
        <div className="flex w-full flex-col rounded-xl bg-white p-4 shadow-md md:w-[60vw] md:p-8">
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
            <img
              src="/assets/imgs/banner-login.webp"
              alt="Banner Login"
              className="hidden min-h-[500px] w-full rounded-xl object-cover md:block md:w-1/2 xl:min-h-[600px]"
              width={400}
              height={800}
            />
            <section className="flex w-full flex-col gap-2 md:w-1/2">
              <MdCategory className="h-14 w-auto text-black text-primary" />
              <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                {type === 'signIn'
                  ? 'Sign in to your account'
                  : 'Create an account'}
              </h2>

              {type === 'signIn' ? <SignInForm /> : <SignUpForm />}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignOverview;
