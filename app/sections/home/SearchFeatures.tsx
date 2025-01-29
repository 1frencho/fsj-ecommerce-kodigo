import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';

interface EcommerceFeature {
  title: string;
  description: string;
}

const ecommerceFeatures: EcommerceFeature[] = [
  {
    title: 'Discover',
    description:
      'Whether you’re looking for quality or style, we’ve got you covered.',
  },
  {
    title: 'Engagement',
    description:
      'Speak directly to your customers, and build strong relationships with them. ',
  },
  {
    title: 'Integrations',
    description:
      'Connect with third-party tools to enhance your shopping experience.',
  },
  {
    title: 'Automations',
    description: 'Build strategic funnels that will convert.',
  },
];

function SearchFeatures() {
  const { Search } = Input;

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <section className="flex flex-col items-center justify-center gap-4 bg-primary-bg p-4 md:gap-8 md:p-8">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-4 md:gap-8">
        <h4 className="text-pretty text-3xl font-bold text-black">
          The perfect product
        </h4>
        <Search
          placeholder="Laptops, Tablets, Smartphones, Watches, Headphones"
          allowClear
          onSearch={onSearch}
          size="large"
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col rounded-xl p-4 md:w-[30%]">
          <img
            src="/assets/imgs/people.webp"
            alt="Frencho Store Logo"
            width={400}
            height={800}
            className="h-[400px] w-full rounded-xl object-contain md:h-[500px]"
          />
        </div>
        <div className="flex w-full flex-col gap-4 p-4 md:w-[70%]">
          <h4 className="text-pretty text-3xl font-bold text-black">
            Benefits from our offerings
          </h4>
          <p className="text-lg font-medium">
            Applying to memberships is easy and straightforward. Simply fill out
            the form and we{`'`}ll get back to you with all the details.
          </p>
          <div className="grid w-full grid-cols-2 items-center justify-center gap-4">
            {ecommerceFeatures.map((feature, index) => (
              <article
                className="flex h-full min-h-[150px] flex-col justify-center gap-4 rounded-xl bg-gradient-to-r from-primary to-secondary p-4"
                key={index}
              >
                <h4 className="text-pretty text-xl font-semibold text-white">
                  {feature.title}
                </h4>
                <p className="text-lg font-medium text-white">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchFeatures;
