// src/components/Navbar.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../state/adminSlice'; // Import logout action
import { Outlet } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface NavbarProps {
  showLogoutButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showLogoutButton = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the logout action to clear Redux state
        dispatch(logout());

        // Navigate to the login page after logout
        navigate('/');
        Swal.fire('Logged Out!', 'You have successfully logged out.', 'success');
      }
    });
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed top-0 z-50 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Awafi Mill</span>
            </a>
          </div>
          {showLogoutButton && (
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleLogout} // Call handleLogout on click
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
