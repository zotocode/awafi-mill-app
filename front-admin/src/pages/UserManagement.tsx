import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import userApi from "../api/userApi";
import { toast } from "react-toastify";

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  isBlocked?: boolean;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch users data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch user data
  const fetchUsers = async () => {
    setError(null);
    try {
      const response = await userApi.fetchAllUserData();
      console.log(response);

      if (response.status === 200 && response.data) {
        setUsers(response.data.data);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch users");
      // toast.error(error.message || 'An unknown error occurred');
    }
  };

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone No", accessor: "phone" },
    {
      header: "Status",
      accessor: "isBlocked",
      render: (row: User) => {
        return row.isBlocked ? "Blocked" : "Active";
      },
    },
  ];

  const userActions = (row: User) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleBlockUnblock(row)}
        className={`px-3 py-1 rounded-full ${
          row.isBlocked ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        } hover:bg-opacity-80`}
      >
        {row.isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );

  const handleBlockUnblock = async (user: User) => {
    const action = user.isBlocked ? "unblock" : "block";
    const confirmMessage = `Are you sure you want to ${action} ${user.name}?`;

    if (window.confirm(confirmMessage)) {
      try {
        const response = user.isBlocked 
          ? await userApi.unblockUser(user.email) 
          : await userApi.blockUser(user.email);

        if (response.status === 200) {
          toast.success(`User ${action}ed successfully`);
          fetchUsers(); // Re-fetch users after successful action
        } else {
          throw new Error(`Failed to ${action} user`);
        }
      } catch (error) {
        console.error(`Error ${action}ing user:`, error);
        toast.error(`Failed to ${action} user`);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full p-5 justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
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
