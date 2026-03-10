import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { completeVideoUpload } from '../utils/cloudinaryUpload';

function UploadVideoPopup() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [error, setError] = useState('');

  const handleVideoFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        setError('Video file is too large. Maximum size is 500MB.');
        return;
      }
      setVideoFile(file);
      setError('');
    }
  };

  const handleThumbnail = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('Thumbnail file is too large. Maximum size is 5MB.');
        return;
      }
      setThumbnail(file);
      setError('');
    }
  };

  const handleTitle = (event) => setTitle(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  async function uploadVideo() {
    if (!videoFile || !thumbnail || title === "" || description === "") {
      setError("Please fill out all fields to upload the video");
      return;
    }

    setUploading(true);
    setError('');
    setVideoProgress(0);
    setThumbnailProgress(0);

    try {
      const result = await completeVideoUpload(
        videoFile,
        thumbnail,
        title,
        description,
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
        navigate("/edmindashboard");
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
      setUploadStage('');
    }
  }
  return (
    <>
      <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
        <div className="h-full overflow-auto border bg-[#121212]">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Upload Videos</h2>

            <button
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => uploadVideo()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mx-4 mt-4 rounded bg-red-600/20 border border-red-600 p-3 text-red-400">
              {error}
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="mx-4 mt-4 space-y-4 rounded-lg bg-[#1a1a1a] p-6 border border-[#ae7aff]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Upload Progress</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#ae7aff] animate-pulse"></div>
                  <span className="text-sm text-gray-400">
                    {uploadStage === 'thumbnail' && 'Uploading thumbnail...'}
                    {uploadStage === 'video' && 'Uploading video...'}
                    {uploadStage === 'publishing' && 'Publishing video...'}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Progress */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">📷 Thumbnail</span>
                  <span className="text-white font-bold">{thumbnailProgress}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300 ease-out"
                    style={{ width: `${thumbnailProgress}%` }}
                  >
                    <div className="h-full w-full animate-pulse bg-white/20"></div>
                  </div>
                </div>
                {thumbnailProgress === 100 && (
                  <p className="mt-1 text-xs text-green-400">✓ Thumbnail uploaded successfully</p>
                )}
              </div>

              {/* Video Progress */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">🎬 Video</span>
                  <span className="text-white font-bold">{videoProgress}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#ae7aff] to-[#9c6cee] transition-all duration-300 ease-out"
                    style={{ width: `${videoProgress}%` }}
                  >
                    <div className="h-full w-full animate-pulse bg-white/20"></div>
                  </div>
                </div>
                {videoProgress === 100 && (
                  <p className="mt-1 text-xs text-[#ae7aff]">✓ Video uploaded successfully</p>
                )}
              </div>

              {/* Overall Status */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-[#ae7aff] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#ae7aff] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#ae7aff] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {uploadStage === 'publishing' ? 'Almost done! Publishing your video...' : 'Please wait while we upload your files...'}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
            <div className="w-full border-2 border-dashed px-4 py-12 text-center">
              {videoFile ? (
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-green-600/20 p-4">
                    <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-white">{videoFile.name}</p>
                  <p className="text-sm text-gray-400">{formatFileSize(videoFile.size)}</p>
                  {!uploading && (
                    <button
                      onClick={() => setVideoFile(null)}
                      className="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      ></path>
                    </svg>
                  </span>

                  <h6 className="mb-2 font-semibold">
                    Drag and drop video files to upload
                  </h6>
                  <p className="text-gray-400">
                    Your videos will be private untill you publish them.
                  </p>
                  <label
                    htmlFor="upload-video"
                    className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                  >
                    <input
                      type="file"
                      id="upload-video"
                      className="sr-only"
                      onChange={handleVideoFile}
                    />
                    Select Files
                  </label>
                </div>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail<sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
                onChange={handleThumbnail}
                disabled={uploading}
              />
              {thumbnail && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                  <span>✓ {thumbnail.name}</span>
                  <span>({formatFileSize(thumbnail.size)})</span>
                </div>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="title" className="mb-1 inline-block">
                Title<sup>*</sup>
              </label>
              <input
                id="title"
                type="text"
                className="w-full border bg-transparent px-2 py-1 outline-none"
                value={title}
                onChange={handleTitle}
              />
            </div>

            <div className="w-full">
              <label htmlFor="desc" className="mb-1 inline-block">
                Description<sup>*</sup>
              </label>
              <textarea
                id="desc"
                className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
                value={description}
                onChange={handleDescription}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadVideoPopup
