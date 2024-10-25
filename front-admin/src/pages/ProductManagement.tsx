import React from 'react';
import axios from 'axios';

function ProductManagement() {
  const handleBulkDownload = async () => {
    try {
      const response = await axios.get('/api/products/bulk-download', {
        responseType: 'blob', // Important for handling file downloads
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'products.xlsx';
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={handleBulkDownload}>Download Products</button>
      {/* Add other product management UI components here */}
    </div>
  );
}

export default ProductManagement;
