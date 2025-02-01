import type { Product } from '@/components/main/cards/ProductCard';
import ProductCard from '@/components/main/cards/ProductCard';
import { SkeletonProductCard } from '@/components/main/cards/SkeletonCard';
import { getPublicProducts } from '@/lib/apiEcommerce';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        toast.warning('Could not fetch products');
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="flex flex-col items-start justify-start gap-4 p-4 md:flex-row md:p-8">
        <aside className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:w-1/4">
          <h2 className="text-xl font-semibold text-primary">Product List</h2>
        </aside>
        <div className="flex w-full flex-col gap-4">
          <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [...Array(12)].map((_, i) => <SkeletonProductCard key={i} />)
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </section>
        </div>
      </section>
    </>
  );
}

export default ProductsPanel;
