import { FaEye, FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import { MotionDiv } from '../content/MotionDiv';

interface ProductCardProps {
  product: Product;
  isById?: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  description: string;
  rating?: number;
  stock: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

function ProductCard({ product, isById }: ProductCardProps) {
  return (
    <>
      <MotionDiv className="relative flex h-auto w-full items-center justify-center">
        <div className="group w-full rounded-xl bg-white p-2.5 shadow-lg shadow-gray-200 transition-all duration-500 hover:shadow-gray-300">
          <div className="rounded-3xl">
            <img
              src={product.image_url}
              alt="image"
              width={350}
              height={350}
              className="relative z-10 h-[250px] w-full rounded-xl object-cover shadow-lg shadow-stone-300"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 text-center">
            <div className="mb-2 flex w-full items-center justify-between">
              <h4 className="font-manrope text-xl font-bold text-gray-900">
                {product.name}
              </h4>
              <div className="flex items-center justify-end gap-3">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-800">
                  {product.rating}
                </span>
              </div>
            </div>
            <p className="mb-4 text-left text-base font-medium text-gray-500">
              {product.description}
            </p>

            {!isById && (
              <Link
                to={`/product/${product.id}`}
                className="myPrimaryBtn w-full justify-center"
              >
                View <FaEye />
              </Link>
            )}
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

export default ProductCard;
