import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-100"> 
    <div className='flex w-full justify-center place-items-center'>
    <div className="w-16 h-16 border-8 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
    </div>
     
    </div>
  );
};

export default LoadingSpinner;
