import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonProductCard() {
  return (
    <div className="group rounded-xl bg-white p-2.5 shadow-lg shadow-gray-200 transition-all duration-500 hover:shadow-gray-300">
      {/* Imagen Skeleton */}
      <Skeleton className="h-[250px] w-full rounded-xl" />

      {/* Contenedor de detalles */}
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 text-center">
        {/* Nombre del producto */}
        <Skeleton className="h-6 w-[70%]" />

        {/* Descripción del producto */}
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />

        {/* Botón de vista */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
