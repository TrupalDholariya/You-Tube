import {v2 as cloudinary} from 'cloudinary'; 
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log(localFilePath);
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "youtube_video",
      use_filename: true,
      unique_filename: false,
      access_mode: "public",
    });
    // Clean up local file after upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (er) {
    // Clean up local file on error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

/**
 * Generate signed upload parameters for client-side upload
 * This allows direct upload from browser to Cloudinary
 */
const generateSignedUploadParams = (folder = "youtube_video", resourceType = "video") => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // For signed uploads, we don't need upload_preset
  // The signature itself authenticates the upload
  const params = {
    timestamp: timestamp,
    folder: folder,
  };

  // Generate signature
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    ...params,
    signature: signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  };
};

/**
 * Verify uploaded file from Cloudinary
 */
const verifyCloudinaryUpload = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "video",
    });
    return result;
  } catch (error) {
    console.error("Error verifying Cloudinary upload:", error);
    return null;
  }
};

export { uploadOnCloudinary, generateSignedUploadParams, verifyCloudinaryUpload };