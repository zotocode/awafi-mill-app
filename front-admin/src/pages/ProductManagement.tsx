import React, { useEffect, useState, useCallback } from "react";
import Table from "../components/Table";
import ProductModalForm from "../components/ProductModalForm";
import ConfirmationDialog from "../components/ConfirmationDialog"; // Import dialog
import productapi from "../api/productapi";
import { Product } from "../types/productTypes";
import { useNavigate } from "react-router-dom";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";

const ProductManagement: React.FC = () => {
  const [isModal, setModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<"delete" | "list" | null>(null);
  const [showDialog, setShowDialog] = useState(false); // Manage confirmation dialog
  const navigate = useNavigate();

  // Fetch products from API
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

  // Handle delete with confirmation
  const confirmDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setActionType("delete");
    setShowDialog(true);
  };

  const handleDeleteProduct = async () => {
    try {
      if (selectedProduct) {
        await productapi.deleteProduct(selectedProduct._id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== selectedProduct._id)
        );
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setShowDialog(false);
      setSelectedProduct(null);
    }
  };

  // Handle listing/unlisting with confirmation
  const confirmProductListing = (product: Product) => {
    setSelectedProduct(product);
    setActionType("list");
    setShowDialog(true);
  };
  const handleEditProduct = (product: Product) => {
    navigate(`/update-product/${product._id}`);
    setSelectedProduct(product);
    setModal(true);
  };

  const handleProductListing = async () => {
    const { _id, isListed } = selectedProduct!;
    const action = isListed ? "unlist" : "list";
    try {
      const response = await productapi.listingProduct(_id, action);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === _id ? { ...product, isListed: !isListed } : product
          )
        );
      }
    } catch (error) {
      console.error("Error updating product listing:", error);
    } finally {
      setShowDialog(false);
      setSelectedProduct(null);
    }
  };

  // Actions for Table buttons
  const productActions = useCallback((row: { [key: string]: any }) => {
    const product = row as Product; // Casting row as Product
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => confirmProductListing(product)}
          className={`p-1 rounded-full ${
            product.isListed
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          } hover:bg-opacity-80`}
          title={product.isListed ? "Unlist" : "List"}
        >
          {product.isListed ? <ListMinus size={16} /> : <ListPlus size={16} />}
        </button>
        <button
          onClick={() => handleEditProduct(product)}
          className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-80"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => confirmDeleteProduct(product)}
          className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
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
      header: "Status",
      accessor: "isListed",
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Listed" : "Not Listed"}
        </span>
      ),
    },
  ];

  return (
    <>
       <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full justify-end mb-4">
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
        <Table data={products} columns={productColumns} actions={productActions} />
        <ProductModalForm
          isOpen={isModal}
          onClose={() => setModal(false)}
          onProductAdd={(newProduct: Product) =>
            setProducts((prevProducts) => [...prevProducts, newProduct])
          }
        />
        {showDialog && selectedProduct && (
          <ConfirmationDialog
            message={
              actionType === "delete"
                ? `Are you sure you want to delete ${selectedProduct.name}?`
                : `Are you sure you want to ${selectedProduct.isListed ? "unlist" : "list"} ${selectedProduct.name}?`
            }
            confirmButtonLabel={actionType === "delete" ? "Delete" : "Confirm"}
            cancelButtonLabel="Cancel"
            onConfirm={actionType === "delete" ? handleDeleteProduct : handleProductListing}
            onCancel={() => setShowDialog(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;
