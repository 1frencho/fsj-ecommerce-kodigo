import { type Product } from '@/components/main/cards/ProductCard';
import { Form, type FormProps, Image, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { addProductApi, updateProductApi } from '@/lib/apiAdmin';
import { Button } from '@/components/ui/button';
import { mutate } from 'swr';
import { MotionDiv } from '../content/MotionDiv';

function ProductForm({ product }: { product: Product | null }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>(
    product?.image_url ?? '/notFoundImage.webp',
  );

  const onFinish: FormProps<Product>['onFinish'] = async (values) => {
    values = {
      ...values,
      is_active: Boolean(values.is_active),
    };

    setLoading(true);
    try {
      if (product?.id) {
        // Actualizar producto existente
        const updatedProduct = await updateProductApi(product.id, values);
        if (updatedProduct.message === 'Product updated successfully') {
          toast.success('Product updated successfully');
        }
      } else {
        // Crear nuevo producto
        const newProduct = await addProductApi(values);
        if (newProduct.message === 'Product added successfully') {
          toast.success('New product created successfully');
        }
      }
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          keyCode: 27,
          code: 'Escape',
          which: 27,
          bubbles: true,
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error('Error processing the request');
    } finally {
      mutate('/v1/admin/products');
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <MotionDiv className="flex h-full max-h-[75vh] w-full flex-col items-start justify-start gap-4 overflow-auto md:flex-row">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Image
          src={imageUrl || '/notFoundImage.webp'}
          alt="Product Image"
          height={350}
          width={350}
          className="h-[200px] w-[200px] rounded-md object-cover"
        />
      </div>
      <Form
        name="productForm"
        className="w-full md:space-y-4"
        onFinish={onFinish}
        autoComplete="on"
        id="productForm"
        initialValues={{
          ...product,
          is_active: product?.is_active ? 'true' : 'false',
        }}
        form={form}
      >
        <label htmlFor="name" className="text-myPrimary font-medium">
          Name:
        </label>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter a product name' }]}
        >
          <Input size="large" placeholder="E.g. Samsung Galaxy" id="name" />
        </Form.Item>

        <label htmlFor="description" className="text-myPrimary font-medium">
          Description:
        </label>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: 'Please enter a product description' },
          ]}
        >
          <Input.TextArea
            rows={4}
            size="large"
            placeholder="E.g. Latest model with great features"
            id="description"
          />
        </Form.Item>

        <label htmlFor="price" className="text-myPrimary font-medium">
          Price ($):
        </label>
        <Form.Item
          name="price"
          rules={[
            { required: true, message: 'Please enter a price' },
            // {
            //   pattern: /^[\d]{0,7}$/,
            //   message: 'The price must be a number with up to 7 digits',
            // },
            {
              validator: (rule, value) => {
                if (value > 10000) {
                  return Promise.reject(
                    new Error('The price cannot be greater than 10000'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            size="large"
            min={0}
            className="w-full"
            placeholder="E.g. 299.99"
            id="price"
          />
        </Form.Item>

        <label htmlFor="stock" className="text-myPrimary font-medium">
          Stock:
        </label>
        <Form.Item
          name="stock"
          rules={[{ required: true, message: 'Please enter stock quantity' }]}
        >
          <InputNumber
            size="large"
            min={0}
            className="w-full"
            placeholder="E.g. 100"
            id="stock"
          />
        </Form.Item>

        <label htmlFor="is_active" className="text-myPrimary font-medium">
          Status:
        </label>
        <Form.Item
          name="is_active"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select
            size="large"
            placeholder="Select a status"
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          >
            <Select.Option value={'true'}>Active</Select.Option>
            <Select.Option value={'false'}>Inactive</Select.Option>
          </Select>
        </Form.Item>

        <label htmlFor="image_url" className="text-myPrimary font-medium">
          Image URL:
        </label>
        <Form.Item
          name="image_url"
          rules={[
            { required: true, message: 'Please enter an image URL' },
            { type: 'url', message: 'Please enter a valid image URL' },
          ]}
        >
          <Input
            onBlur={(e) => setImageUrl(e.target.value)}
            size="large"
            placeholder="E.g. https://my-image.com"
            id="image_url"
          />
        </Form.Item>

        <Button
          className="myPrimaryBtn w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Save'}
        </Button>
      </Form>
    </MotionDiv>
  );
}

export default ProductForm;
