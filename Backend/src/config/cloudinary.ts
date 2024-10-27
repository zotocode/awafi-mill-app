import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('====================================');
console.log("key fgvngjmyhjkyjky" ,process.env.CLOUDINARY_CLOUD_NAME);
console.log('====================================');
export const uploader = cloudinary.uploader;