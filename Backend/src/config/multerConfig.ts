import express from 'express';
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/'); // Set the upload destination
    },
    filename: (req, file, cb) => {
      // Create a unique filename using the current timestamp and original name
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  // Initialize upload variable with the storage configuration
  export const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 }, // Limit file size to 1 MB
    fileFilter: (req, file, cb) => {
      // Accept only certain file types (e.g., images)
      const filetypes = /jpeg|jpg|png|gif/; // Allowed file extensions
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {

         throw new Error("This is an error"); 

      }
    }
  });