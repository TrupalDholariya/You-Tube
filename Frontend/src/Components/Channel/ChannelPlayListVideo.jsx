/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


function ChannelPlayListVideo() {
  const navigate = useNavigate();
  const { userName, playlistId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [playlistData, setPlaylistData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);

  // fetch playlist User
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://youtube-backend-psi.vercel.app/api/v1/playlists/${playlistId}`,
          withCredentials: true,
        });
        setPlaylistData(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchPlaylistData();
  }, [userName, playlistId]);

  // fetch subscription
  useEffect(() => {
    if (playlistData) {
      const fetchSubscription = async () => {
        try {
          const res = await axios.get(
            `https://youtube-backend-psi.vercel.app/api/v1/subscriptions/u/${playlistData.owner._id}`,
            { withCredentials: true }
          );
          setSubscription(res.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchSubscription();
    }
  }, [loading, playlistId, userName, playlistData]);

  const handleRemoveVideo = async (videoId) => {
    if (!window.confirm("Remove this video from playlist?")) {
      return;
    }
    try {
      await axios.patch(
        `https://youtube-backend-psi.vercel.app/api/v1/playlists/remove/${videoId}/${playlistId}`,
        {},
        { withCredentials: true }
      );
      // Refresh playlist data
      const res = await axios.get(
        `https://youtube-backend-psi.vercel.app/api/v1/playlists/${playlistId}`,
        { withCredentials: true }
      );
      setPlaylistData(res.data.data);
    } catch (error) {
      console.error("Error removing video:", error);
      alert("Failed to remove video");
    }
  };

  const isOwner = currentUser && playlistData?.owner?._id === currentUser._id;

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
          <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
            <div className="mt-6 flex items-center gap-x-3 mb-5">
              <div className="h-16 w-16 shrink-0">
                <img
                  src={playlistData?.owner?.avatar}
                  alt="React Patterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full">
                <h6 className="font-semibold">{playlistData?.owner?.name}</h6>
                <p className="text-sm text-gray-300">
                  {subscription ? subscription.length : 0} Subscribers
                </p>
              </div>
            </div>
            <div className="relative mb-2 w-full pt-[56%]">
              <div className="absolute inset-0">
                <img
                  src={playlistData?.videos[0]?.thumbnail}
                  alt={playlistData?.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0">
                  <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                    <div className="relative z-[1]">
                      <p className="flex justify-between">
                        <span className="inline-block">Playlist</span>
                        <span className="inline-block">
                          {playlistData?.videos
                            ? playlistData.videos.length
                            : 0}
                           videos
                        </span>
                      </p>
                      <p className="text-sm text-gray-200">
                        {playlistData?.totalViews} Views · 2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mb-1 font-semibold">{playlistData?.name}</h6>
            <p className="flex text-sm text-gray-200">
              {playlistData?.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-y-4">
            {playlistData?.videos && playlistData.videos.length > 0 ? (
              playlistData.videos.map((video, index) => (
                <div className="border rounded-lg p-3" key={index}>
                  <div className="w-full sm:flex gap-x-4">
                    <div className="relative mb-2 w-full sm:w-5/12">
                      <div className="w-full pt-[56%]">
                        <button
                          onClick={() => {
                            navigate(`/video/${video._id}`);
                          }}
                        >
                          <div className="absolute inset-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                        </button>

                        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          {video.duration.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-x-2 px-2 sm:w-7/12 sm:px-0">
                      <div className="h-10 w-10 shrink-0 sm:hidden">
                        <img
                          src={video.owner.avatar}
                          alt={video.owner.name}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex items-start justify-between gap-2">
                          <h6 className="mb-1 font-semibold flex-1">
                            {video.title}
                          </h6>
                          {isOwner && (
                            <button
                              onClick={() => handleRemoveVideo(video._id)}
                              className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 shrink-0"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-200 sm:mt-3">
                          {video.views} Views ·{" "}
                          {(
                            (new Date() - new Date(video.createdAt)) /
                            (1000 * 60 * 60 * 24)
                          ).toFixed(2)}{" "}
                          days ago
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/userProfile/${video.owner.userName}/videos`);
                          }}
                        >
                          <div className="flex items-center gap-x-4">
                            <div className="mt-2 hidden h-10 w-10 shrink-0 sm:block">
                              <img
                                src={video.owner.avatar}
                                alt={video.owner.name}
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <p className="text-sm text-gray-200">
                              {video.owner.userName}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-400">No videos available</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ChannelPlayListVideo;
