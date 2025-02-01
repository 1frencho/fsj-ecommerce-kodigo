import { type Product } from '@/components/main/cards/ProductCard';
import { fetcher } from '@/lib/apiEcommerce';
import { removeProductApi } from '@/lib/apiAdmin';
import { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Image } from 'antd';
import MainModal from '@/components/main/dialogs/MainModal';

const EnhancedTable = lazy(
  () => import('@/components/main/tables/EnhancedTable'),
);
// const MainModal = lazy(() => import('@/components/main/dialogs/MainModal'));
const ProductForm = lazy(() => import('@/components/main/forms/ProductForm'));

dayjs.locale('es');

const ActionsCell = memo(
  ({
    id,
    onEdit,
    onDelete,
    isDisabled,
  }: {
    id: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    isDisabled: boolean;
  }) => (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={isDisabled}
        onClick={() => onEdit(id)}
        className="myPrimaryBtn"
        aria-label="Editar"
      >
        <FaEdit />
      </button>
      <button
        disabled={isDisabled}
        onClick={() => onDelete(id)}
        className="rounded-lg bg-red-400 p-2 text-white transition-colors hover:bg-red-500"
        aria-label="Eliminar"
      >
        <FaTrash />
      </button>
    </div>
  ),
);

ActionsCell.displayName = 'ActionsCell';

function ManageProductsPanel() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useSWR<Product[]>(
    '/v1/admin/products',
    fetcher,
  );
  const products = useMemo(() => data ?? [], [data]);

  if (error) {
    toast.error('Error al cargar los productos');
  }

  const handleEdit = useCallback(
    (id: number) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        setSelectedProduct(product);
        setOpen(true);
      }
    },
    [products],
  );

  const handleDelete = useCallback((id: number) => {
    toast.warning('¿Estás seguro de eliminar este producto?', {
      action: {
        label: 'Eliminar',
        onClick: async () => {
          mutate(
            '/v1/products',
            (currentData: Product[] | undefined) => {
              if (!currentData) return currentData;
              return currentData.filter((product) => product.id !== id);
            },
            false,
          );

          try {
            const response = await removeProductApi(id);
            if (response?.message === 'Product deleted successfully') {
              toast.success('Product deleted successfully');
            } else {
              throw new Error('Error deleting product');
            }
          } catch {
            toast.error('Error deleting product');
            mutate('/v1/products');
          }
        },
      },
    });
  }, []);

  const dateComparator = useCallback((date1: string, date2: string) => {
    return new Date(date1).getTime() - new Date(date2).getTime();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: 'image_url',
        headerName: 'Imagen',
        cellStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cellRenderer: ({ value }: { value: string | null }) => (
          <div className="flex items-center justify-center">
            <Image
              src={value || '/notFoundImage.webp'}
              alt="Imagen del producto"
              height={35}
              width={35}
              className="h-[35px] w-[35px] rounded-md object-cover"
            />
          </div>
        ),
      },
      { field: 'name', headerName: 'Name', filter: 'agTextColumnFilter' },
      {
        field: 'description',
        headerName: 'Description',
        filter: 'agTextColumnFilter',
      },
      { field: 'price', headerName: 'Price', filter: 'agNumberColumnFilter' },
      { field: 'stock', headerName: 'Stock', filter: 'agNumberColumnFilter' },
      {
        field: 'is_active',
        headerName: 'Status',
        cellRenderer: ({ value }: { value: number }) =>
          value ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-500">Inactive</span>
          ),
      },
      {
        field: 'created_at',
        headerName: 'Created',
        sort: 'desc' as const, // ✅ SOLUCIÓN: Forzamos a un valor de tipo SortDirection
        comparator: dateComparator,
        valueFormatter: ({ value }: { value: string }) =>
          dayjs(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        cellStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        cellRenderer: ({ data }: { data: { id: number } }) => (
          <ActionsCell
            id={data.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDisabled={isLoading}
          />
        ),
      },
    ],
    [handleEdit, handleDelete, isLoading, dateComparator],
  );

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-row items-center gap-2 p-4 pb-0">
        <MainModal
          style={{ minWidth: '60vw' }}
          buttonTrigger={
            <button
              className="myPrimaryBtn"
              disabled={isLoading}
              onClick={() => {
                setSelectedProduct({
                  id: 0,
                  name: '',
                  description: '',
                  price: '0.00',
                  stock: 0,
                  image_url: '',
                  is_active: false,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                });
                setOpen(true);
              }}
            >
              Agregar nuevo producto
            </button>
          }
          title={selectedProduct?.id ? 'Editar producto' : 'Agregar producto'}
          description={
            selectedProduct
              ? 'Edita los campos del formulario para actualizar el producto.'
              : 'Completa el formulario para agregar un nuevo producto.'
          }
          open={open}
          setOpen={setOpen}
        >
          <ProductForm product={selectedProduct} />
        </MainModal>
      </div>

      <section className="flex w-full flex-col gap-4 p-4 md:p-6">
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <EnhancedTable
            columnDefs={columnDefs}
            rowData={products}
            paginationPageSize={10}
          />
        )}
      </section>
    </Suspense>
  );
}

export default memo(ManageProductsPanel);
