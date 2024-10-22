import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create directories if they don't exist
const createUploadDir = (dir:any) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Set storage engine for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'src/uploads/';
    createUploadDir(dir);
    cb(null, dir); // Set the upload destination
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp and original name
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Set storage engine for Excel files
const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'src/uploads/bulkUpload';
    createUploadDir(dir); // Create the directory if it doesn't exist
    cb(null, dir); // Set the upload destination for Excel files
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp and original name
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize upload variable with the storage configuration for images
export const uploadImages = multer({
  storage: imageStorage,
  limits: { fileSize: 50000000 }, // Limit file size to 50 MB
  fileFilter: (req, file, cb) => {
    // Accept only certain file types (e.g., images)
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type. Only images are allowed.")); 
    }
  }
});

// Initialize upload variable with the storage configuration for Excel files
export const uploadExcel = multer({
  storage: excelStorage,
  limits: { fileSize: 50000000 }, // Limit file size to 50 MB
  fileFilter: (req, file, cb) => {
    
    // Accept only certain file types (e.g., Excel files)
    const filetypes = /xls|xlsx|csv/; // Allowed file extensions for Excel

    // Check for allowed MIME types for Excel files
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
      'application/csv', // .csv
      'application/octet-stream' // Generic binary stream
    ];

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type. Only Excel files are allowed."));
    }
  },
});