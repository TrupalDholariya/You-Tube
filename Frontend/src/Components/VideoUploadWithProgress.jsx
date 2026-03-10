/** @format */

import React, { useState } from 'react';
import { completeVideoUpload } from '../utils/cloudinaryUpload';

function VideoUploadWithProgress({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState(''); // 'thumbnail', 'video', 'publishing'
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (e.g., max 500MB)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        setError('Video file is too large. Maximum size is 500MB.');
        return;
      }
      setVideoFile(file);
      setError('');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('Thumbnail file is too large. Maximum size is 5MB.');
        return;
      }
      setThumbnailFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    if (!videoFile || !thumbnailFile) {
      setError('Please select both video and thumbnail files');
      return;
    }

    setUploading(true);
    setError('');
    setVideoProgress(0);
    setThumbnailProgress(0);

    try {
      const result = await completeVideoUpload(
        videoFile,
        thumbnailFile,
        formData.title,
        formData.description,
        (progress) => {
          setUploadStage('video');
          setVideoProgress(progress);
        },
        (progress) => {
          setUploadStage('thumbnail');
          setThumbnailProgress(progress);
        }
      );

      if (result.success) {
        setUploadStage('publishing');
        alert('Video uploaded successfully!');
        if (onSuccess) onSuccess(result.data);
        if (onClose) onClose();
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
      setUploadStage('');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-[#121212] p-6 max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Upload Video</h2>
          <button
            onClick={onClose}
            disabled={uploading}
            className="text-gray-400 hover:text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-600/20 border border-red-600 p-3 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={uploading}
              className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff] disabled:opacity-50"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={uploading}
              className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff] disabled:opacity-50"
              placeholder="Enter video description"
              rows="4"
              required
            />
          </div>

          {/* Video File */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Video File * (Max 500MB)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={uploading}
              className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff] disabled:opacity-50"
              required
            />
            {videoFile && (
              <p className="mt-1 text-sm text-gray-400">
                Selected: {videoFile.name} ({formatFileSize(videoFile.size)})
              </p>
            )}
          </div>

          {/* Thumbnail File */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Thumbnail * (Max 5MB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              disabled={uploading}
              className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff] disabled:opacity-50"
              required
            />
            {thumbnailFile && (
              <p className="mt-1 text-sm text-gray-400">
                Selected: {thumbnailFile.name} ({formatFileSize(thumbnailFile.size)})
              </p>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-3 rounded-lg bg-[#1a1a1a] p-4">
              <h3 className="font-semibold text-white">Upload Progress</h3>
              
              {/* Thumbnail Progress */}
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">Thumbnail</span>
                  <span className="text-white">{thumbnailProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${thumbnailProgress}%` }}
                  />
                </div>
              </div>

              {/* Video Progress */}
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">Video</span>
                  <span className="text-white">{videoProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-[#ae7aff] transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <p className="text-sm text-gray-400">
                {uploadStage === 'thumbnail' && 'Uploading thumbnail...'}
                {uploadStage === 'video' && 'Uploading video...'}
                {uploadStage === 'publishing' && 'Publishing video...'}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-white/10 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-4 rounded-lg bg-blue-600/20 border border-blue-600 p-3">
          <p className="text-sm text-blue-400">
            ℹ️ Large videos are uploaded directly to Cloudinary for better performance.
            This may take a few minutes depending on your internet speed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoUploadWithProgress;
