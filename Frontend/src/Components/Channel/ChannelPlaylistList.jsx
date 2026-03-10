/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ChannelPlaylist() {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch Profile User
  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://youtube-backend-psi.vercel.app/api/v1/users/c/${userName}`,
          withCredentials: true,
        });
        setProfileUser(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchProfileUser();
  }, [userName]);

  // Fetch Playlist of profile user
  useEffect(() => {
    if (profileUser?._id) {
      const fetchPlaylistData = async () => {
        try {
          const res = await axios({
            method: "GET",
            url: `https://youtube-backend-psi.vercel.app/api/v1/playlists/user/${profileUser._id}`,
            withCredentials: true,
          });
          setPlaylistData(res.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingData(false);
        }
      };
      fetchPlaylistData();
    }
  }, [profileUser]);

  if (loadingData) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <>
      <div className="grid gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {playlistData?.length > 0 ? (
          playlistData.map((playlist, index) => (
            <button
              key={index}
              onClick={() => navigate(`${playlist._id}`)}
              className="hover:opacity-90"
            >
              <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative mb-2 pt-[56%] w-full ">
                  <div className="absolute inset-0">
                    <img
                      src={playlist?.videoData[0]?.thumbnail}
                      alt={playlist.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="relative border-t bg-white/30 p-2 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                          <p className="flex justify-between">
                            <span className="inline-block">Playlist</span>
                            <span className="inline-block">
                              {playlist.videos ? playlist.videos.length : 0}{" "}
                              videos
                            </span>
                          </p>
                          <p className="flex text-sm text-gray-200">
                            {playlist.totalViews} Views ·{" "}
                            {(
                              (new Date() - new Date(playlist.createdAt)) /
                              (1000 * 60 * 60 * 24)
                            ).toFixed(0)}{" "}
                            days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="ml-2 flex font-semibold text-white">
                  {playlist.name}
                </h6>
                <p className="ml-2 flex mb-1 text-sm text-gray-400">
                  {playlist.description}
                </p>
              </div>
            </button>
          ))
        ) : (
          <h1 className="text-center text-white text-lg">
            No playlists available
          </h1>
        )}
      </div>
    </>
  );
}

export default ChannelPlaylist;
