import { Link } from 'react-router';

function MainHero() {
  return (
    <>
      <section className="bg-primary-bg flex items-center justify-center p-4 md:h-[89vh] md:p-8 xl:h-[93vh]">
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-8 xl:max-w-7xl">
          <div className="flex items-center justify-center gap-4 md:w-1/2">
            <img
              src="/assets/imgs/iphone.webp"
              alt="Frencho Store Logo"
              width={400}
              height={800}
              className="h-[400px] w-full object-contain md:h-[500px] xl:h-[800px]"
            />
          </div>
          <div className="flex flex-col items-start gap-4 md:w-1/2">
            <h2 className="text-5xl font-bold xl:text-5xl">
              Discover the best products crafted with care and precision.
            </h2>

            <p className="text-lg font-semibold">
              Whether you{`'`}re looking for quality or style, we{`'`}ve got you
              covered. Explore our latest collection today and elevate your
              shopping experience.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/products" className="myPrimaryBtn">
                Explore New Arrivals
              </Link>
              <Link to="/signup" className="myPrimaryOutlineBtn">
                Create Your Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainHero;
