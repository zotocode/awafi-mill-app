import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";

const CategoryManagementPage = () => {
  const categoryData = [
    { categoryName: "Phones", productsCount: 10 },
    { categoryName: "Laptops", productsCount: 5 },
    { categoryName: "Accessories", productsCount: 12 },
  ];

  const categoryColumns = [
    { header: "Category Name", accessor: "categoryName" },
    { header: "Products Count", accessor: "productsCount" },
  ];

  const categoryActions = (row: { [key: string]: any }) => (
    <>
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>{" "}
      |
      <a
        href="#"
        className="font-medium text-red-600 dark:text-red-500 hover:underline"
      >
        Delete
      </a>
    </>
  );

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex w-full p-5  justify-end">
        <button type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Category</button>
        </div>
        <Table
          data={categoryData}
          columns={categoryColumns}
          actions={categoryActions}
        />
      </div>
    </>
  );
};

export default CategoryManagementPage;
