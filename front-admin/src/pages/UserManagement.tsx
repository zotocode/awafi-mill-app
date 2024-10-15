import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
 

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await userApi.fetchAllUserData();
      console.log(response);
      
      if (response.status === 200) {   
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch users");
    }
  }

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "status", accessor: "role" },
  ];

  const userActions = (row: User) => (
    <div className="flex space-x-2">
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    // Open your modal here
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex w-full p-5 justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <button
            onClick={() => setSelectedUser(null)} // You may add functionality to open a modal here
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add User
          </button>
        </div>
        <Table data={users} columns={userColumns} actions={userActions} />
      </div>
      {/* Add a modal similar to CategoryModalForm for user handling */}
    </>
  );
};

export default UserManagementPage;
