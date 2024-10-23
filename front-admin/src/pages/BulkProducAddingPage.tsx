import React, { useState } from 'react';
import productapi from '../api/productapi';
import { toast } from 'react-toastify';

const BulkProducAddingPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
       console.log('resp',response)
      if (response.status === 200) {
        toast.success("File uploaded successfully");
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
    <div className="flex flex-col gap-10 w-full p-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-center">
        <div
          className={`w-64 bg-white p-6 rounded-lg border-dashed border-2 border-black shadow-lg flex items-center justify-center ${
            isDragging ? 'border-blue-500' : 'border-gray-400'
          }`}
          onClick={handleUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <button className="w-full py-2 text-blue-600 font-semibold rounded-lg transition-colors duration-300">
            {isDragging ? 'Drop the file here...' : 'Upload or Drag & Drop Excel'}
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="flex flex-col items-center mt-4">
          <p className="font-semibold">Selected File:</p>
          <p className="text-gray-700">{selectedFile.name}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => setSelectedFile(null)}
          >
            Remove File
          </button>
        </div>
      )}

      {selectedFile && (
        <div className="flex justify-center mt-4">
          <button
            className={`px-6 py-2 bg-green-500 text-white rounded-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkProducAddingPage;
