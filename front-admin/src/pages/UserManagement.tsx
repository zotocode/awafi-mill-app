import  { useEffect, useState } from "react";
import Table from "../components/Tables/Table";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import ConfirmationDialog from "../components/ConfirmationDialog";

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  isBlocked?: boolean;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const limit=25
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages returned from backend
  


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


  useEffect(() => {
    fetchUsers();
  }, [currentPage,limit]);

  const fetchUsers = async () => {
    try {
      const response = await userApi.fetchAllUserData(currentPage,limit);

      if (response.status === 200 && response.data) {
        setUsers(response.data.data);
        setTotalPages(response.data.totalPages)
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      toast.error(error.message || 'An unknown error occurred');
    }
  };

  const handleBlockUnblock = (row: User) => {
    setUserData(row);
    setShowConfirmationDialog(true);
  };

  const handleConfirmAction = async () => {
    if (userData) {
      const action = userData.isBlocked ? "unblock" : "block";
     

      try {
        const response = userData.isBlocked 
          ? await userApi.unblockUser(userData.email) 
          : await userApi.blockUser(userData.email);

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

    setShowConfirmationDialog(false);
  };

  const handleCancelAction = () => {
    setShowConfirmationDialog(false);
    setUserData(null);
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

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="flex w-full p-5 justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
        </div>
        <Table data={users} columns={userColumns} actions={userActions} />
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
        {showConfirmationDialog && userData && (
          <ConfirmationDialog
            message="Are you sure you want to block this user?"
            confirmButtonLabel="Yes"
            cancelButtonLabel="No"
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        )}
      </div>
    </>
  );
};

export default UserManagementPage;
