import React, { useEffect, useState } from "react";
import Table from "../components/Table";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setError(null);
    try {
      const response = await userApi.fetchAllUserData();
      console.log(response);
      
      if (response.status === 200 && response.data) {   
        setUsers(response.data.data);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError('Failed to fetch users');
      // toast.error(error.message || 'An unknown error occurred');
    }
  }

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "role" },
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
    // setSelectedUser(user);
    // edit function is here
    // Open your modal here
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        toast.success("User deleted successfully");
      } catch (error) {
        // toast.error(error.message || 'An unknown error occurred');
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>

      
      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex w-full p-5 justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <button
            // onClick={() => setSelectedUser(null)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add User
          </button>
        </div>
        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        ) : null}
        <Table data={users} columns={userColumns} actions={userActions} />
      </div>
    </>
  );
};

export default UserManagementPage;
