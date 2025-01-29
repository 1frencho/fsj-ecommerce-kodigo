interface QuickItem {
  name: string;
}

const quickEcommerceItems: QuickItem[] = [
  {
    name: 'Quality',
  },
  {
    name: 'Style',
  },
  {
    name: 'Performance',
  },
  {
    name: 'Customer Service',
  },
  {
    name: 'Reliability',
  },
];

function QuickBanner() {
  return (
    <>
      <section className="flex min-h-[150px] w-full flex-col items-center justify-center bg-gradient-to-r from-primary to-secondary p-4 md:flex-row md:p-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          {quickEcommerceItems.map((item) => (
            <h3
              className="flex items-center gap-2 text-3xl font-semibold text-[#f7ddff]"
              key={item.name}
            >
              {item.name}
            </h3>
          ))}
        </div>
      </section>
    </>
  );
}

export default QuickBanner;
