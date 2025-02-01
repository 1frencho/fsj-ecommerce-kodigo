import MyBreadCrumb from '@/components/main/MyBreadCrumb';
import ManageProductsPanel from '@/sections/admin/ManageProductsPanel';

// export function meta({data}: Route.MetaArgs) {
export function meta() {
  return [
    { title: 'Manage Products | Ecommerce Store' },
    { name: 'description', content: 'Manage products as an admin' },
  ];
}

export default function ManageProductsPage() {
  return (
    <>
      <MyBreadCrumb
        name="Manage Products"
        description="Manage products as an admin"
      />
      <ManageProductsPanel />
    </>
  );
}
