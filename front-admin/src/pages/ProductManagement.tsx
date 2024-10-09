import Navbar from '../components/Navbar';
import Table from '../components/Table';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import ProductModalForm from '../components/ProductModalForm';

const ProductManagement = () => {
    const[isModal,setModal]=useState(false)
  const productData = [
    { productName: 'iPhone 12', category: 'Phones', price: '$799' },
    { productName: 'MacBook Pro', category: 'Laptops', price: '$1299' },
    { productName: 'AirPods', category: 'Accessories', price: '$199' },
  ];

  const productColumns = [
    { header: 'Product Name', accessor: 'productName' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
  ];
  const handleModalClose = () => {
    setModal(false);
  };

  const productActions = (row: { [key: string]: any }) => (
    <>
      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> |
      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
    </>
  );

  return (
    <>
    <Navbar />
    <Sidebar />
    
    <div className="p-4 sm:ml-64 mt-16">
    <div className="flex w-full  justify-end">
        <button onClick={()=>{setModal(true)}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Product</button>
        </div>
      <Table data={productData} columns={productColumns} actions={productActions} />
      <ProductModalForm isOpen={isModal} onClose={handleModalClose} />
    </div>
    </>
  );


  
};

export default ProductManagement;
