import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import CategoryModalForm from "../components/CategoryModalForm";
import categoryapi from "../api/categoryapi";
import { toast } from "react-toastify";
import { ListMinus, ListPlus, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: number; // or string, based on your API
  name: string;
  description: string;
  isListed: boolean;
}

const CategoryManagementPage = () => {
  const [isModal, setModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await categoryapi.fetchAllCategories();
      if (response.status === 200) {
        setCategories(response.data);
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

  const handleSuccess = (newCategory: Category) => {
     console.log("new",newCategory)
    setCategories(prev => {
      const existingCategoryIndex = prev.findIndex(cat => cat.id === newCategory.id);
      
      // If category exists, update it. Otherwise, add the new category
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
    console.log("worked yet")
    // toast.success(`Category ${newCategory.id ? 'updated' : 'added'} successfully`);
  };
  

  const categoryActions = (row: { [key: string]: any }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleList(row)}
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
        onClick={() => handleDelete(row)}
        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setModal(true);
  };

  const handleDelete = async (category: any) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      try {
        await categoryapi.deleteCategory(category.id);
        setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Failed to delete category");
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleList = async (category: any) => {
    const action = category.isListed ? "unlist" : "list";
    if (
      window.confirm(`Are you sure you want to ${action} ${category.name}?`)
    ) {
      try {
        const response = await categoryapi.blockCategory(category.id, action);
        if (response.status === 200) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === category.id ? { ...cat, isListed: !cat.isListed } : cat
            )
          );
          toast.success(`Category ${action}ed successfully`);
        }
      } catch (error) {
        toast.error(`Failed to ${action} category`);
        console.error(`Error ${action}ing category:`, error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex w-full p-5 justify-between items-center">
          <h1 className="text-2xl font-semibold">Category Management</h1>
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
        <Table
          data={categories}
          columns={categoryColumns}
          actions={categoryActions}
        />
      </div>
      <CategoryModalForm
        isOpen={isModal}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoryManagementPage;
