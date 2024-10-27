import React, { useState } from 'react';
import productapi from '../../api/productapi';
import { toast } from 'react-toastify';

const BulkProducAddingPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
<<<<<<< HEAD
=======
  const [uploadResult, setUploadResult] = useState<any>(null);
>>>>>>> upstream/develop

  // Handle click-based file upload
  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xls,.xlsx';
    input.style.display = 'none';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files![0];
      if (file) {
        handleFileSelection(file);
      }
    };
    input.click();
  };

  // Handle drag-and-drop file upload
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  // Handle file selection
  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
  };

  // Handle file submission to API
  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before submitting");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await productapi.bulkAddProduct(formData);
<<<<<<< HEAD
       console.log('resp',response)
      if (response.status === 200) {
        toast.success("File uploaded successfully");
=======
      if (response.status === 200) {
        toast.success(response.data.product.message);
        setUploadResult(response.data.product);
>>>>>>> upstream/develop
        setSelectedFile(null);
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-10 w-full p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-center">
        <div
          className={`w-64 bg-white p-6 rounded-lg border-dashed border-2 border-black shadow-lg flex items-center justify-center ${
            isDragging ? 'border-blue-500' : 'border-gray-400'
          }`}
=======
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Bulk Product Upload</h1>
      
      <div className="flex justify-center">
        <div
          className={`w-full max-w-md p-6 rounded-lg border-dashed border-2 ${
            isDragging ? 'border-gray-600' : 'border-gray-300'
          } transition-colors duration-300`}
>>>>>>> upstream/develop
          onClick={handleUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
<<<<<<< HEAD
          <button className="w-full py-2 text-blue-600 font-semibold rounded-lg transition-colors duration-300">
=======
          <button className="w-full py-3 text-gray-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-gray-100">
>>>>>>> upstream/develop
            {isDragging ? 'Drop the file here...' : 'Upload or Drag & Drop Excel'}
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="flex flex-col items-center mt-4">
          <p className="font-semibold">Selected File:</p>
          <p className="text-gray-700">{selectedFile.name}</p>
          <button
<<<<<<< HEAD
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
=======
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
>>>>>>> upstream/develop
            onClick={() => setSelectedFile(null)}
          >
            Remove File
          </button>
        </div>
      )}

      {selectedFile && (
        <div className="flex justify-center mt-4">
          <button
<<<<<<< HEAD
            className={`px-6 py-2 bg-green-500 text-white rounded-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
=======
            className={`px-6 py-2 bg-black text-white rounded-lg ${
              isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            } transition-colors duration-300`}
>>>>>>> upstream/develop
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
<<<<<<< HEAD
=======

      {uploadResult && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Upload Results</h2>
          <p className="text-lg mb-4">{uploadResult.message}</p>
          <div className="flex justify-between mb-6">
            <p className="text-gray-800">Successful: <span className="font-semibold">{uploadResult.successCount}</span></p>
            <p className="text-gray-800">Failed: <span className="font-semibold">{uploadResult.failedCount}</span></p>
          </div>
          {uploadResult.failedCount > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Failed Products:</h3>
              <ul className="list-disc pl-5">
                {uploadResult.failedMessages.map((msg: string, index: number) => (
                  <li key={index} className="text-gray-700">{msg}</li>
                ))}
              </ul>
            </div>
          )}
          {uploadResult.successCount > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Successfully Added Products:</h3>
              <ul className="list-disc pl-5">
                {uploadResult.successMessages.map((msg: string, index: number) => (
                  <li key={index} className="text-gray-700">{msg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
>>>>>>> upstream/develop
    </div>
  );
};

export default BulkProducAddingPage;
