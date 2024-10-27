<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
import Table from "../../components/Tables/Table";
import CategoryModalForm from "../../components/Category/CategoryModalForm";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import categoryapi from "../../api/categoryapi";
import { toast } from "react-toastify";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";
import { Category } from '../../types/categoryType';
import { TableColumn } from '../../components/Tables/Table';
=======
import categoryapi from "../../api/categoryapi";
import CategoryModalForm from "../../components/Category/CategoryModalForm";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Table from "../../components/Tables/Table";
import { TableColumn } from "../../components/Tables/Table";
import { Category } from "../../types/categoryType";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";
import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchBar from "../../components/Search/SearchBar";
>>>>>>> upstream/develop

const MainCategoryManagementPage = () => {
  const [isModal, setModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "list">();
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const [itemsPerPage] = useState(10); // Items per page
<<<<<<< HEAD

  useEffect(() => {
    fetchCategories();
  }, [currentPage]); // Fetch categories when currentPage changes

  const fetchCategories = async () => {
    try {
      const response = await categoryapi.fetchAllCategories(currentPage, itemsPerPage);
      if (response.status === 200) {
        
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages); // Update total pages
=======
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // For debouncing
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search term change
    fetchCategories(); // Fetch categories whenever the debounced search term changes
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchCategories(); // Fetch categories on page change
  }, [currentPage]);

  const fetchCategories = async () => {
    setIsSearching(true);
    try {
      let response;
      if (debouncedSearchTerm) {
        response = await categoryapi.searchCategories(debouncedSearchTerm, currentPage, itemsPerPage);
      } else {
        response = await categoryapi.fetchAllCategories(currentPage, itemsPerPage);
      }
      if (response.status === 200) {
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages);
>>>>>>> upstream/develop
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Failed to fetch categories");
<<<<<<< HEAD
=======
    } finally {
      setIsSearching(false);
>>>>>>> upstream/develop
    }
  };

  const categoryColumns: TableColumn[] = [
    { header: "Category Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      accessor: "isListed",
      render: (row: { [key: string]: any }) => (
<<<<<<< HEAD
        <span className={`px-2 py-1 rounded-full text-xs ${row.isListed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
=======
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.isListed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
>>>>>>> upstream/develop
          {row.isListed ? "Listed" : "Not Listed"}
        </span>
      ),
    },
  ];

  const handleModalClose = () => {
    setModal(false);
    setSelectedCategory(null);
  };

  const handleSuccess = (newCategory: Category) => {
<<<<<<< HEAD
    setCategories(prev => {
      const existingCategoryIndex = prev.findIndex(cat => cat._id === newCategory._id);
=======
    setCategories((prev) => {
      const existingCategoryIndex = prev.findIndex((cat) => cat._id === newCategory._id);
>>>>>>> upstream/develop
      if (existingCategoryIndex !== -1) {
        const updatedCategories = [...prev];
        updatedCategories[existingCategoryIndex] = newCategory;
        return updatedCategories;
      } else {
<<<<<<< HEAD
        return [...prev, newCategory];
=======
        return [newCategory,...prev];
>>>>>>> upstream/develop
      }
    });
    setModal(false);
    setSelectedCategory(null);
  };

  const categoryActions = (row: { [key: string]: any }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => openConfirmationDialog("list", row)}
<<<<<<< HEAD
        className={`p-1 rounded-full ${row.isListed ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"} hover:bg-opacity-80`}
=======
        className={`p-1 rounded-full ${
          row.isListed
            ? "bg-yellow-100 text-yellow-600"
            : "bg-green-100 text-green-600"
        } hover:bg-opacity-80`}
>>>>>>> upstream/develop
        title={row.isListed ? "Unlist" : "List"}
      >
        {row.isListed ? <ListMinus size={16} /> : <ListPlus size={16} />}
      </button>
      <button
        onClick={() => handleEdit(row)}
        className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-80"
        title="Edit"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={() => openConfirmationDialog("delete", row)}
        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const openConfirmationDialog = (type: "delete" | "list", category: any) => {
    setActionType(type);
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setModal(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        await categoryapi.deleteCategory(selectedCategory._id);
<<<<<<< HEAD
        setCategories(prev => prev.filter(cat => cat._id !== selectedCategory._id));
=======
        setCategories((prev) => prev.filter((cat) => cat._id !== selectedCategory._id));
>>>>>>> upstream/develop
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Failed to delete category");
        console.error("Error deleting category:", error);
      } finally {
        setShowDialog(false);
      }
    }
  };

<<<<<<< HEAD
  const handleProductListing = async () => {
=======
  const handleCategoryListing = async () => {
>>>>>>> upstream/develop
    if (selectedCategory) {
      const action = selectedCategory.isListed ? "unlist" : "list";
      try {
        const response = await categoryapi.blockCategory(selectedCategory._id, action);
        if (response.status === 200) {
<<<<<<< HEAD
          setCategories(prev =>
            prev.map(cat =>
              cat._id === selectedCategory._id ? { ...cat, isListed: !cat.isListed } : cat
=======
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === selectedCategory._id
                ? { ...cat, isListed: !cat.isListed }
                : cat
>>>>>>> upstream/develop
            )
          );
          toast.success(`Category ${action}ed successfully`);
        }
      } catch (error) {
        toast.error(`Failed to ${action} category`);
        console.error(`Error ${action}ing category:`, error);
      } finally {
        setShowDialog(false);
      }
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
<<<<<<< HEAD
      setCurrentPage(prevPage => prevPage + 1);
=======
      setCurrentPage((prevPage) => prevPage + 1);
>>>>>>> upstream/develop
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
<<<<<<< HEAD
      setCurrentPage(prevPage => prevPage - 1);
=======
      setCurrentPage((prevPage) => prevPage - 1);
>>>>>>> upstream/develop
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full p-5 justify-between items-center">
<<<<<<< HEAD
=======
          <div className="hidden lg:flex lg:flex-grow justify-center">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
            />
          </div>
>>>>>>> upstream/develop
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-black hover:bg-[#363333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
<<<<<<< HEAD
        <Table data={categories} columns={categoryColumns} actions={categoryActions} />
=======
        <Table
          data={categories}
          columns={categoryColumns}
          actions={categoryActions}
        />
>>>>>>> upstream/develop

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
<<<<<<< HEAD
            className={`px-4 py-2 text-sm ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
=======
            className={`px-4 py-2 text-sm ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } rounded`}
>>>>>>> upstream/develop
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
<<<<<<< HEAD
            className={`px-4 py-2 text-sm ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
=======
            className={`px-4 py-2 text-sm ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } rounded`}
>>>>>>> upstream/develop
          >
            Next
          </button>
        </div>
      </div>
<<<<<<< HEAD
      <CategoryModalForm
        isOpen={isModal}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        category={selectedCategory}
      />
      {/* Confirmation Dialog for list/unlist or delete actions */}
=======
      {/* Conditional rendering for Confirmation Dialog */}
>>>>>>> upstream/develop
      {showDialog && selectedCategory && (
        <ConfirmationDialog
          message={
            actionType === "delete"
              ? `Are you sure you want to delete ${selectedCategory.name}?`
              : `Are you sure you want to ${selectedCategory.isListed ? "unlist" : "list"} ${selectedCategory.name}?`
          }
          confirmButtonLabel={actionType === "delete" ? "Delete" : "Confirm"}
          cancelButtonLabel="Cancel"
<<<<<<< HEAD
          onConfirm={actionType === "delete" ? handleDeleteCategory : handleProductListing}
          onCancel={() => setShowDialog(false)}
        />
      )}
=======
          onConfirm={actionType === "delete" ? handleDeleteCategory : handleCategoryListing}
          onCancel={() => setShowDialog(false)}
        />
      )}
      <CategoryModalForm
        isOpen={isModal}
        onClose={handleModalClose}
        category={selectedCategory}
        onSuccess={handleSuccess}
      />
>>>>>>> upstream/develop
    </>
  );
};

export default MainCategoryManagementPage;
