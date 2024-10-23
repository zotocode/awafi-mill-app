// src/components/Dashboard.tsx
import React from 'react';
import Table from '../components/Table';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store'; 

const Dashboard = () => {
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
    <div className="flex flex-col gap-10 w-full">
      <div className="p-4 sm:ml-64 mt-16">  
          <Table data={productData} columns={columns} />   
      </div>
    </div>
  );
};

export default Dashboard;
