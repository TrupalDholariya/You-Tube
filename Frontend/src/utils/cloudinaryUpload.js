import axios from 'axios';
import { api } from '../store/slices/userSlice';

/**
 * Upload file directly to Cloudinary from browser
 * This bypasses the server for large files
 * 
 * @param {File} file - The file to upload
 * @param {string} resourceType - 'video' or 'image'
 * @param {Function} onProgress - Progress callback (percent)
 * @returns {Promise<Object>} Upload result with URL and metadata
 */
export const uploadToCloudinary = async (file, resourceType = 'video', onProgress) => {
  try {
    // Step 1: Get signed upload parameters from backend
    const signatureResponse = await api.get('/videos/upload-signature', {
      params: {
        folder: 'youtube_video',
        resourceType: resourceType,
      },
    });

    const uploadParams = signatureResponse.data.data;

    // Step 2: Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', uploadParams.api_key);
    formData.append('timestamp', uploadParams.timestamp);
    formData.append('signature', uploadParams.signature);
    formData.append('folder', uploadParams.folder);

    // Step 3: Upload directly to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${uploadParams.cloud_name}/${resourceType}/upload`;

    const uploadResponse = await axios.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return {
      success: true,
      url: uploadResponse.data.secure_url,
      publicId: uploadResponse.data.public_id,
      duration: uploadResponse.data.duration || 0,
      format: uploadResponse.data.format,
      resourceType: uploadResponse.data.resource_type,
      width: uploadResponse.data.width,
      height: uploadResponse.data.height,
      bytes: uploadResponse.data.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const errorMessage = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message 
      || 'Upload failed';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Upload video with thumbnail
 * Returns both URLs for backend submission
 */
export const uploadVideoWithThumbnail = async (
  videoFile,
  thumbnailFile,
  onVideoProgress,
  onThumbnailProgress
) => {
  try {
    // Upload thumbnail first (smaller file)
    const thumbnailResult = await uploadToCloudinary(
      thumbnailFile,
      'image',
      onThumbnailProgress
    );

    if (!thumbnailResult.success) {
      throw new Error(`Thumbnail upload failed: ${thumbnailResult.error}`);
    }

    // Upload video
    const videoResult = await uploadToCloudinary(
      videoFile,
      'video',
      onVideoProgress
    );

    if (!videoResult.success) {
      throw new Error(`Video upload failed: ${videoResult.error}`);
    }

    return {
      success: true,
      video: videoResult,
      thumbnail: thumbnailResult,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Publish video to backend after Cloudinary upload
 */
export const publishVideo = async (videoData) => {
  try {
    const response = await api.post('/videos/publish-with-urls', videoData);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

/**
 * Complete video upload flow
 * 1. Upload to Cloudinary
 * 2. Publish to backend
 */
export const completeVideoUpload = async (
  videoFile,
  thumbnailFile,
  title,
  description,
  onVideoProgress,
  onThumbnailProgress
) => {
  try {
    // Step 1: Upload files to Cloudinary
    const uploadResult = await uploadVideoWithThumbnail(
      videoFile,
      thumbnailFile,
      onVideoProgress,
      onThumbnailProgress
    );

    if (!uploadResult.success) {
      throw new Error(uploadResult.error);
    }

    // Step 2: Publish to backend
    const publishResult = await publishVideo({
      title,
      description,
      videoUrl: uploadResult.video.url,
      thumbnailUrl: uploadResult.thumbnail.url,
      duration: uploadResult.video.duration,
      publicId: uploadResult.video.publicId,
    });

    if (!publishResult.success) {
      throw new Error(publishResult.error);
    }

    return {
      success: true,
      data: publishResult.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export default {
  uploadToCloudinary,
  uploadVideoWithThumbnail,
  publishVideo,
  completeVideoUpload,
};
