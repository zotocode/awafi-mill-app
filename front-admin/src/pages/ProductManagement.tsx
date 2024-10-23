import React, { useEffect, useState, useCallback } from "react";
import Table from "../components/Table";
import ProductModalForm from "../components/ProductModalForm";
import ConfirmationDialog from "../components/ConfirmationDialog";
import productapi from "../api/productapi";
import { Product } from "../types/productTypes";
import { useNavigate } from "react-router-dom";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";

const ProductManagement: React.FC = () => {
  const [isModal, setModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<"delete" | "list" | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages returned from backend
  const navigate = useNavigate();

  // Fetch products from API with pagination
  const fetchProducts = useCallback(async (page: number, limit: number) => {
    try {
      const response = await productapi.fetchAllProducts(page, limit);
      if (response.status === 200) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages); // Update total pages
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage); // Fetch products for current page
  }, [fetchProducts, currentPage, itemsPerPage]);

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
        fetchProducts(currentPage, itemsPerPage); // Re-fetch products for the current page after delete
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
        fetchProducts(currentPage, itemsPerPage); // Re-fetch products after listing/unlisting
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

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
        <div className="flex w-full justify-between mb-4">
          <button
            onClick={() => navigate("/bulk-adding")}
            type="button"
            className="text-white bg-black hover:bg-[#8e8f91] hover:text-black-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Bulk Add
          </button>
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-black hover:bg-[#8e8f91] hover:text-black-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
        <Table data={products} columns={productColumns} actions={productActions} />
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } rounded`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } rounded`}
          >
            Next
          </button>
        </div>
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
                : `Are you sure you want to ${
                    selectedProduct.isListed ? "unlist" : "list"
                  } ${selectedProduct.name}?`
            }
            confirmButtonLabel={actionType === "delete" ? "Delete" : "Confirm"}
            cancelButtonLabel="Cancel"
            onConfirm={
              actionType === "delete" ? handleDeleteProduct : handleProductListing
            }
            onCancel={() => setShowDialog(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;
