import React from "react";

interface ConfirmationDialogProps {
  message: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-none z-50">
      <div className="bg-white dark:bg-gray-800 p-8  py-12 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out">
        <p className="text-center text-lg mb-6 text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            {confirmButtonLabel}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            {cancelButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;