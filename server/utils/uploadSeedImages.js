import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// Function to upload an image from a file path
async function uploadImageToCloudinary(imagePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.error(`File not found: ${imagePath}`);
      return null;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "binkeyit",
      use_filename: true,
      unique_filename: true
    });

    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    return null;
  }
}

// Function to check if an image already exists in Cloudinary
async function getExistingCloudinaryImage(publicId) {
  try {
    const result = await cloudinary.api.resource(`binkeyit/${publicId}`);
    return result.secure_url;
  } catch (error) {
    return null;
  }
}

// Main function to process images
async function processImages(images, assetsDir) {
  const results = [];
  for (const imageName of images) {
    // First check if image already exists in Cloudinary
    const publicId = path.parse(imageName).name; // Remove extension
    let imageUrl = await getExistingCloudinaryImage(publicId);
    
    if (!imageUrl) {
      // If not in Cloudinary, upload it
      const imagePath = path.join(assetsDir, imageName);
      imageUrl = await uploadImageToCloudinary(imagePath);
    }
    
    if (imageUrl) {
      results.push(imageUrl);
    }
  }
  return results;
}

export default processImages;
