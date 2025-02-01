import ProductsPanel from '@/sections/products/ProductsPanel';

// export function meta({data}: Route.MetaArgs) {
export function meta() {
  return [
    { title: 'All Products | Ecommerce Store' },
    { name: 'description', content: 'Get every product from Ecommerce Store' },
  ];
}

export default function ProductsPage() {
  return (
    <>
      <ProductsPanel />
    </>
  );
}
