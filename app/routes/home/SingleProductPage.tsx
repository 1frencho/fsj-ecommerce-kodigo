import type { Product } from '@/components/main/cards/ProductCard';
import ProductCard from '@/components/main/cards/ProductCard';
import { RatingCard } from '@/components/main/cards/RatingCard';
import { Skeleton } from '@/components/ui/skeleton';
import useAuth from '@/hooks/useAuth';
import { getSingleProductById, rateProduct } from '@/lib/apiEcommerce';
import { Form, Input, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

function SingleProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getSingleProductById(Number(id))
        .then((product) => {
          setProduct(product);
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

  if (!product?.id && isLoading) {
    return;
  }
  if (!product?.id) {
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
    if (!product?.id) {
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
      toast.success('Product rating successful');
    }
    form.resetFields();
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex flex-col items-center justify-center gap-2 p-4 md:flex-row md:p-8">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </>
      ) : (
        <section className="flex flex-col items-start justify-start gap-4 p-4 md:flex-row md:p-8">
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <h3 className="text-xl font-semibold text-primary">
              Product Details
            </h3>
            <ProductCard key={product.id} product={product} isById />
          </div>
          <aside className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:w-1/2">
            <h3 className="text-xl font-semibold text-primary">Reviews</h3>
            {session?.user?.id && (
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
                    rules={[
                      { required: true, message: 'Please enter a rating' },
                    ]}
                  >
                    <Rate />
                  </Form.Item>
                  <button type="submit" className="myPrimaryBtn">
                    Submit
                  </button>
                </Form>
              </article>
            )}

            <RatingCard
              testimonial={{
                id: 1,
                name: 'Jane D',
                role: 'CEO',
                avatar: 'https://pagedone.io/asset/uploads/1695365794.png',
                rating: 4,
                comment:
                  'The user interface of this app is so intuitive, I was able to start using it without any guidance.',
              }}
            />
          </aside>
        </section>
      )}
    </>
  );
}

export default SingleProductPage;
