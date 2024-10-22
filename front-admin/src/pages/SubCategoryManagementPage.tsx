import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import SubCategoryModalForm from "../components/SubCategoryModalForm";
import ConfirmationDialog from "../components/ConfirmationDialog";
import subcategoryapi from "../api/subcategoryapi";
import { toast } from "react-toastify";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";
import { subCategory } from '../types/categoryType';

const SubCategoryManagementPage = () => {
  const [isModal, setModal] = useState(false);
  const [categories, setCategories] = useState<subCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<subCategory | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [actionType, setActionType] = useState<"list" | "delete" | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [itemsPerPage] = useState(10); // Define how many items to show per page

  useEffect(() => {
    fetchCategories();
  }, [currentPage]); // Fetch categories whenever currentPage changes

  async function fetchCategories() {
    try {
      const response = await subcategoryapi.fetchAllCategories(currentPage, itemsPerPage);
      if (response.status === 200) {
        console.log("sub category",response.data)
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages); // Set total pages from response
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Failed to fetch categories");
    }
  }

  const categoryColumns = [
    { header: "Category Name", accessor: "name" },
    { header: "Description", accessor: "description" },
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

  const handleModalClose = () => {
    setModal(false);
    setSelectedCategory(null);
  };

  const handleSuccess = (newCategory: subCategory) => {
    setCategories(prev => {
      const existingCategoryIndex = prev.findIndex(cat => cat._id === newCategory._id);

      if (existingCategoryIndex !== -1) {
        const updatedCategories = [...prev];
        updatedCategories[existingCategoryIndex] = newCategory;
        return updatedCategories;
      } else {
        return [...prev, newCategory];
      }
    });

    setModal(false);
    setSelectedCategory(null);
  };

  const categoryActions = (row: { [key: string]: any }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => triggerAction(row, "list")}
        className={`p-1 rounded-full ${
          row.isListed
            ? "bg-yellow-100 text-yellow-600"
            : "bg-green-100 text-green-600"
        } hover:bg-opacity-80`}
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
        onClick={() => triggerAction(row, "delete")}
        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const triggerAction = (category: any, type: "list" | "delete") => {
    setSelectedCategory(category);
    setActionType(type);
    setShowDialog(true);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setModal(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        await subcategoryapi.deleteCategory(selectedCategory._id);
        setCategories((prev) => prev.filter((cat) => cat._id !== selectedCategory._id));
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Failed to delete category");
        console.error("Error deleting category:", error);
      } finally {
        setShowDialog(false);
      }
    }
  };

  const handleCategoryListing = async () => {
    if (selectedCategory) {
      const action = selectedCategory.isListed ? "unlist" : "list";
      try {
        const response = await subcategoryapi.lisitingAndUnlisting(selectedCategory._id, action);
        if (response.status === 200) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === selectedCategory._id ? { ...cat, isListed: !cat.isListed } : cat
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
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full p-5 justify-between items-center">
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
        <Table data={categories} columns={categoryColumns} actions={categoryActions} />

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
          >
            Next
          </button>
        </div>
      </div>

      <SubCategoryModalForm
        isOpen={isModal}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        category={selectedCategory}
      />

      {showDialog && selectedCategory && (
        <ConfirmationDialog
          message={
            actionType === "delete"
              ? `Are you sure you want to delete ${selectedCategory.name}?`
              : `Are you sure you want to ${selectedCategory.isListed ? "unlist" : "list"} ${selectedCategory.name}?`
          }
          confirmButtonLabel={actionType === "delete" ? "Delete" : "Confirm"}
          cancelButtonLabel="Cancel"
          onConfirm={actionType === "delete" ? handleDeleteCategory : handleCategoryListing}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default SubCategoryManagementPage;
