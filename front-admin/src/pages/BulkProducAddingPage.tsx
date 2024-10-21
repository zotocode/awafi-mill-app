import React, { useState } from 'react';

interface FileItem {
  name: string;
  type: string;
}

const BulkProducAddingPage = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle click-based file upload
  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xls,.xlsx';
    input.style.display = 'none';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files![0];
      if (file) {
        handleFile(file);
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
      handleFile(file);
      console.log('fileis here',file)
    }
  };

  // Common function to handle file processing
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target!.result;
      if (content instanceof ArrayBuffer) {
        const arrayBufferView = new Uint8Array(content);
        const decoder = new TextDecoder();
        const decodedContent = decoder.decode(arrayBufferView);
        console.log(decodedContent); // Here you can parse and process the Excel content
      }
    };
    reader.readAsArrayBuffer(file);

    // Simulate adding the file
    setFiles(prevFiles => [...prevFiles, { name: file.name, type: file.type }]);
    setSelectedFile(null);
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
          <button
            className="w-full py-2 text-blue-600 font-semibold rounded-lg transition-colors duration-300"
          >
            {isDragging ? 'Drop the file here...' : 'Upload or Drag & Drop Excel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkProducAddingPage;
