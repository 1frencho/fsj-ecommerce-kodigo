import type { Product } from '@/components/main/cards/ProductCard';
import ProductCard from '@/components/main/cards/ProductCard';
import { RatingCard, type Rating } from '@/components/main/cards/RatingCard';
import { Skeleton } from '@/components/ui/skeleton';
import useAuth from '@/hooks/useAuth';
import {
  getProductRatingsById,
  getSingleProductById,
  rateProduct,
} from '@/lib/apiEcommerce';
import { Alert, Form, Input, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

function SingleProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<{
    product: Product | null;
    ratings: Rating[];
  }>({
    product: null,
    ratings: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      // getSingleProductById(Number(id))
      //   .then((product) => {
      //     setData(prev => ({
      //       ...prev,
      //       product: product,
      //     }));
      //   })
      //   .catch((error) => {
      //     toast.warning('Could not fetch product');
      //     console.error(error);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });

      Promise.all([
        getSingleProductById(Number(id)),
        getProductRatingsById(Number(id)),
      ])
        .then(([product, ratings]) => {
          setData((prev) => ({
            ...prev,
            product: product,
            ratings: ratings,
          }));
        })
        .catch((error) => {
          toast.warning('Could not fetch product');
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-2 p-4 md:flex-row md:p-8">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </>
    );
  }

  if (!data?.product?.id && isLoading) {
    return;
  }

  if (!data?.product?.id) {
    toast.error('Invalid product ID');
    navigate('/');
    return;
  }

  const onFinish = async (values: { quantity: number; comment: string }) => {
    if (!session?.user?.id) {
      toast.error('You must be logged in to rate a product');
      return;
    }
    if (!values.quantity) {
      toast.error('Please select a rating');
      return;
    }
    if (!values.comment) {
      toast.error('Please enter a comment');
      return;
    }
    if (!data?.product?.id) {
      toast.error('Product not found');
      return;
    }

    const response = await rateProduct({
      product_id: Number(id),
      quantity: Number(values.quantity * 2),
      comment: values.comment,
    });

    if (response.message !== 'Valoracion ingresada correctamente') {
      toast.error('Product rating failed. Product not found');
    } else {
      toast.success('Product rating successful. It will be available soon.');
    }
    form.resetFields();
  };

  return (
    <>
      <section className="flex flex-col items-start justify-start gap-4 p-4 md:flex-row md:p-8">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <h3 className="text-xl font-semibold text-primary">
            Product Details
          </h3>
          <ProductCard key={data.product.id} product={data.product} isById />
        </div>
        <aside className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:w-1/2">
          <h3 className="text-xl font-semibold text-primary">Reviews</h3>

          {session?.user?.id ? (
            <article className="flex w-full flex-col gap-2">
              <p className="text-sm leading-6 text-gray-500">
                You can rate this product many times as you like. (TESTING)
              </p>
              <Form name="basic" onFinish={onFinish} form={form}>
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: 'Please enter a comment' },
                    {
                      min: 10,
                      message: 'Comment must be at least 10 characters',
                    },
                    {
                      max: 200,
                      message: 'Comment must be at most 100 characters',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter a comment"
                    className="w-full"
                    maxLength={200}
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true, message: 'Please enter a rating' }]}
                >
                  <Rate />
                </Form.Item>
                <button type="submit" className="myPrimaryBtn">
                  Submit
                </button>
              </Form>
            </article>
          ) : (
            <Alert
              message="You must be logged in to rate a product"
              type="info"
            />
          )}

          {data.ratings.map((rating) => (
            <RatingCard key={rating.id} testimonial={rating} />
          ))}
          {data.ratings.length === 0 && (
            <p className="text-sm leading-6 text-gray-500">
              No reviews yet. Log in to rate this product.
            </p>
          )}
        </aside>
      </section>
    </>
  );
}

export default SingleProductPage;
