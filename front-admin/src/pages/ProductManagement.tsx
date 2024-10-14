import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../layouts/Navbar";
import Table from "../components/Table";
import Sidebar from "../layouts/Sidebar";
import ProductModalForm from "../components/ProductModalForm";
import productapi from "../api/productapi";
import { Product } from "../types/productTypes";
import { useNavigate } from "react-router-dom";

const ProductManagement: React.FC = () => {
  const [isModal, setModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate=useNavigate()
  

  const fetchProducts = useCallback(async () => {
    try {
      const response = await productapi.fetchAllProducts();
      if (response.status === 200) {

        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (id: string) => {
    try {
      await productapi.deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {

     navigate(`/update-product/${product._id}`)
     console.log("is handling")
    setSelectedProduct(product);
    setModal(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModal(true);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const productActions = useCallback((row: { [key: string]: any }) => {
    const product = row as Product;
    return (
      <>
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
          onClick={() => handleEditProduct(product)}
        >
          Edit
        </button>
        <button
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={() => handleDeleteProduct(product._id)}
        >
          Delete
        </button>
      </>
    );
  }, []);

  const productColumns = [
    { header: "Product Name", accessor: "name" },
    {
      header: "Category",
      accessor: "category",
      render: (category: any) => category?.name || "N/A",
    },
    {
      header: "Price",
      accessor: "variants",
      render: (variants: any[]) =>
        variants.length > 0 && variants[0]?.price !== undefined
          ? variants[0].price.toFixed(2)
          : "N/A",
    },
  ];

  return (
    <>
    
      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex w-full justify-end mb-4">
          <button
            onClick={handleAddProduct}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
        <Table
          data={products}
          columns={productColumns}
          actions={productActions}
        />
        <ProductModalForm
          isOpen={isModal}
          onClose={handleModalClose}
          onProductAdd={handleProductAdd}
        />
      </div>
    </>
  );
};

export default ProductManagement;
