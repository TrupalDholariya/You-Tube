import React, { createContext, useContext, useState, useCallback } from 'react';

const VideoContext = createContext(null);

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoHistory, setVideoHistory] = useState([]);
  const [playbackSettings, setPlaybackSettings] = useState({
    volume: 1,
    playbackRate: 1,
    quality: 'auto',
    autoplay: false,
  });

  const updateCurrentVideo = useCallback((video) => {
    setCurrentVideo(video);
    if (video) {
      setVideoHistory((prev) => {
        const filtered = prev.filter((v) => v._id !== video._id);
        return [video, ...filtered].slice(0, 50); // Keep last 50 videos
      });
    }
  }, []);

  const updatePlaybackSettings = useCallback((settings) => {
    setPlaybackSettings((prev) => ({ ...prev, ...settings }));
    localStorage.setItem('playbackSettings', JSON.stringify({ ...playbackSettings, ...settings }));
  }, [playbackSettings]);

  const clearVideoHistory = useCallback(() => {
    setVideoHistory([]);
  }, []);

  const value = {
    currentVideo,
    setCurrentVideo: updateCurrentVideo,
    videoHistory,
    clearVideoHistory,
    playbackSettings,
    updatePlaybackSettings,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within VideoProvider');
  }
  return context;
};

export default VideoContext;
