import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
   
    <div className='flex w-full h-full justify-center place-items-center '>
    <div className="w-16 h-16 border-8 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
