
import Table from '../../components/Tables/Table';

const OrderManagementPage = () => {
  const productData = [
    { productName: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
    { productName: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
    { productName: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
    { productName: 'Google Pixel Phone', color: 'Gray', category: 'Phone', price: '$799' },
    { productName: 'Apple Watch 5', color: 'Red', category: 'Wearables', price: '$999' },
  ];

  const columns = [
    { header: 'Product Name', accessor: 'productName' },
    { header: 'Color', accessor: 'color' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
  ];

  return (
    <>
    
    <div className="flex flex-col gap-10 w-full">
    <div className="hidden lg:flex lg:flex-grow justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        <Table data={productData} columns={columns} />
      </div>
    </>
  );
};

export default OrderManagementPage;
