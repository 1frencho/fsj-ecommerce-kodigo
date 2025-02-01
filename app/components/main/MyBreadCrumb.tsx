interface BreadCrumb {
  name: string;
  description: string;
  // bgImage: string;
  height?: string;
}

function MyBreadCrumb({ description, name, height = '300px' }: BreadCrumb) {
  return (
    <section
      aria-label="Breadcrumb"
      className="flex w-full flex-col items-start justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 md:px-8"
      style={{
        minHeight: height,
      }}
    >
      <h2 className="text-3xl font-bold text-white md:text-5xl">{name}</h2>
      <p className="text-base font-medium text-slate-100 md:text-xl">
        {description}
      </p>
    </section>
  );
}

export default MyBreadCrumb;
