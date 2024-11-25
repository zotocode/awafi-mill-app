import productapi from "../../api/productapi";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import ProductModalForm from "../../components/Product/ProductModalForm";
import ImagePreviewModal from "../../components/Product/ProductPreview";
import Table from "../../components/Tables/Table";
import { TableColumn } from "../../components/Tables/Table";
import { Product } from "../../types/productTypes";
import {
  ListMinus,
  ListPlus,
  Pencil,
  Trash2,
  Eye,
  ChevronDown,
} from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";
import { debounce } from 'lodash'; // Make sure to install lodash if not already installed

const ProductManagement: React.FC = () => {
  const [isModal, setModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<"delete" | "list" | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages returned from backend
  const navigate = useNavigate();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modify fetchProducts to use searchByName when there's a search term
  const fetchProducts = useCallback(async (page: number, limit: number, search: string = '') => {
    setIsSearching(!!search);
    try {
      let response;
      if (search) {
        response = await productapi.searchByName(page, limit, search);
      } else {
        response = await productapi.fetchAllProducts(page, limit);
      }
      if (response.status === 200) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setCurrentPage(1); // Reset to first page when searching
      fetchProducts(1, itemsPerPage, search);
    }, 300),
    [fetchProducts, itemsPerPage]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

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
  const handleBulkDownload = async () => {
    try {
        const response = await productapi.bulkDownload();

        if (response.data) {
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "products.xlsx";
            link.click();

            window.URL.revokeObjectURL(link.href);
        } else {
            console.error("No data received from the server");
        }
    } catch (error) {
        console.error("Error downloading bulk data:", error);
    }
};


  const handlePreviewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowPreviewModal(true);
  };

  // Actions for Table buttons
  const productActions = useCallback((row: { [key: string]: any }) => {
    const product = row as Product; // Casting row as Product
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handlePreviewProduct(product)}
          className="p-1 rounded-full bg-purple-100 text-purple-600 hover:bg-opacity-80"
          title="Preview"
        >
          <Eye size={16} />
        </button>
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

  const productColumns: TableColumn[] = [
    {
      header: "Image",
      accessor: "images",
      render: (row: { [key: string]: any }) => (
        <div className="w-12 h-12">
          {" "}
          {/* Reduced from w-16 h-16 */}
          <img
            src={
              row.images && row.images.length > 0
                ? row.images[0].toString()
                : "placeholder-image-url"
            }
            alt={row.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ),
    },
    { header: "Product Name", accessor: "name" },
    {
      header: "Status",
      accessor: "isListed",
      render: (row: { [key: string]: any }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.isListed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.isListed ? "Listed" : "Not Listed"}
        </span>
      ),
    },
  ];

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full justify-between mb-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="text-white bg-black hover:bg-[#2d2e2e]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between w-44"
            >
              Bulk Actions
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ease-in-out">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/bulk-upload");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                    >
                      Bulk Upload
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleBulkDownload();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                    >
                      Bulk Download
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="hidden lg:flex lg:flex-grow justify-center">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
              title="Serch by product name"
            />
          </div>

          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-black hover:bg-[#2d2e2e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
        <Table
          data={products}
          columns={productColumns}
          actions={productActions}
        />
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
            setProducts((prevProducts) => [newProduct, ...prevProducts])
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
              actionType === "delete"
                ? handleDeleteProduct
                : handleProductListing
            }
            onCancel={() => setShowDialog(false)}
          />
        )}
        Image
        <ImagePreviewModal
          product={selectedProduct}
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
        />
      </div>
    </>
  );
};

export default ProductManagement;
