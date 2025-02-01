import MyBreadCrumb from '@/components/main/MyBreadCrumb';
import RatingsPanel from '@/sections/ratings/RatingsPanel';

// export function meta({data}: Route.MetaArgs) {
export function meta() {
  return [
    { title: 'Product Reviews | Ecommerce Store' },
    { name: 'description', content: 'Get ratings and reviews for products' },
  ];
}

export default function ProductReviewsPage() {
  return (
    <>
      <MyBreadCrumb
        name="Product Reviews"
        description="Get ratings and reviews for products"
      />
      <RatingsPanel />
    </>
  );
}
