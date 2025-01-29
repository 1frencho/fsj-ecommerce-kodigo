// import { MyLogo } from './MyLogo';

export const MyLoading = () => {
  return (
    <div className="relative z-50 flex h-[100vh] items-center justify-center bg-white">
      {/* <MyLogo className="absolute left-1/2 top-1/2 h-16 -translate-x-1/2 -translate-y-1/2 flex-col" /> */}
      {/* <FaApple className="text-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl" /> */}
      <div className="h-50 w-50 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
};
