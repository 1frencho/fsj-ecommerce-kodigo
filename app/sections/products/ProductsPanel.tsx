import type { Product } from '@/components/main/cards/ProductCard';
import ProductCard from '@/components/main/cards/ProductCard';
import { SkeletonProductCard } from '@/components/main/cards/SkeletonCard';
import { getPublicProducts, type ProductFilters } from '@/lib/apiEcommerce';
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchValue, setSearchValue] = useState(''); // 🔹 Nuevo estado para el input

  const { Search } = Input;

  // Debounce function to optimize API calls
  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    setIsLoading(true);
    getPublicProducts(debouncedFilters)
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
  }, [debouncedFilters]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // 🔹 Actualiza el estado del input en tiempo real
  };

  const onSearch = (value: string) => {
    if (!value || value.length < 3) return;
    setFilters((prev) => ({ ...prev, name: value }));
  };

  const handleResetFilters = () => {
    if (Object.keys(filters).length > 0) {
      setFilters({});
      setSearchValue(''); // 🔹 También resetea el input de búsqueda
    }
  };

  const onSortByChange = (value: ProductFilters['sort_by']) => {
    setFilters((prev) => ({ ...prev, sort_by: value }));
  };

  const onSortOrderChange = (value: ProductFilters['sort_order']) => {
    setFilters((prev) => ({ ...prev, sort_order: value }));
  };

  return (
    <>
      <section className="flex flex-col items-start justify-start gap-4 p-4 md:flex-row md:p-8">
        <aside className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:w-1/4">
          <h2 className="text-xl font-semibold text-primary">Product List</h2>
          <button className="mySecondaryBtn" onClick={handleResetFilters}>
            Reset filters
          </button>
          <Search
            placeholder="Laptops, Tablets, Smartphones, Watches, Headphones"
            onSearch={onSearch}
            onChange={onSearchChange} // 🔹 Actualiza el input en tiempo real
            value={searchValue} // 🔹 Muestra el valor actualizado del input
            className="w-full"
            size="large"
          />
          <p className="text-sm font-medium text-gray-500">Sort by</p>
          <Select
            id="sort-by"
            defaultValue={'none'}
            onChange={onSortByChange}
            value={filters.sort_by}
          >
            <Select.Option value={'none'}>None</Select.Option>
            <Select.Option value="name">Name</Select.Option>
            <Select.Option value="price">Price</Select.Option>
            <Select.Option value="stock">Stock</Select.Option>
            <Select.Option value="is_active">Status</Select.Option>
            <Select.Option value="average_rating">Average Rating</Select.Option>
          </Select>
          <Select
            id="sort-order"
            defaultValue="none"
            onChange={onSortOrderChange}
            value={filters.sort_order || 'none'}
          >
            <Select.Option value="none">None</Select.Option>
            <Select.Option value="desc">Descending</Select.Option>
            <Select.Option value="asc">Ascending</Select.Option>
          </Select>
          <p className="text-sm font-medium text-gray-500">Min Price</p>
          <Input
            type="number"
            min={0}
            max={1000}
            value={filters.min_price ?? ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              setFilters((prev) => ({ ...prev, min_price: value }));
            }}
            className="w-full"
          />
          <p className="text-sm font-medium text-gray-500">Max Price</p>
          <Input
            type="number"
            min={0}
            max={1000}
            value={filters.max_price ?? ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              setFilters((prev) => ({ ...prev, max_price: value }));
            }}
            className="w-full"
          />
        </aside>
        <div className="flex w-full flex-col gap-4">
          <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? [...Array(12)].map((_, i) => <SkeletonProductCard key={i} />)
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            {!isLoading && products.length === 0 && (
              <p className="text-center text-lg text-gray-500">
                No available products
              </p>
            )}
          </section>
        </div>
      </section>
    </>
  );
}

export default ProductsPanel;
