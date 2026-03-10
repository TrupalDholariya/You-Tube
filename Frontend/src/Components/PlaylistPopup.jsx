/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function PlaylistPopup({ videoId, onClose }) {
  const { currentUser } = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch user playlists
  useEffect(() => {
    if (currentUser) {
      const fetchPlaylists = async () => {
        try {
          const res = await axios.get(
            `https://youtube-backend-psi.vercel.app/api/v1/playlists/user/${currentUser._id}`,
            { withCredentials: true }
          );
          setPlaylists(res.data.data);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlaylists();
    }
  }, [currentUser]);

  // Check if video is in playlist
  const isVideoInPlaylist = (playlist) => {
    return playlist.videos?.includes(videoId);
  };

  // Toggle video in playlist
  const handleTogglePlaylist = async (playlistId, isInPlaylist) => {
    try {
      if (isInPlaylist) {
        // Remove from playlist
        await axios.patch(
          `https://youtube-backend-psi.vercel.app/api/v1/playlists/remove/${videoId}/${playlistId}`,
          {},
          { withCredentials: true }
        );
      } else {
        // Add to playlist
        await axios.patch(
          `https://youtube-backend-psi.vercel.app/api/v1/playlists/add/${videoId}/${playlistId}`,
          {},
          { withCredentials: true }
        );
      }
      // Refresh playlists
      if (currentUser) {
        const res = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/playlists/user/${currentUser._id}`,
          { withCredentials: true }
        );
        setPlaylists(res.data.data);
      }
    } catch (error) {
      console.error("Error toggling playlist:", error);
      alert("Failed to update playlist");
    }
  };

  // Create new playlist
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim() || !newPlaylistDescription.trim()) {
      alert("Please enter both name and description");
      return;
    }

    setCreating(true);
    try {
      const res = await axios.post(
        "https://youtube-backend-psi.vercel.app/api/v1/playlists",
        {
          name: newPlaylistName,
          description: newPlaylistDescription,
        },
        { withCredentials: true }
      );

      // Add video to the newly created playlist
      const newPlaylistId = res.data.data._id;
      await axios.patch(
        `https://youtube-backend-psi.vercel.app/api/v1/playlists/add/${videoId}/${newPlaylistId}`,
        {},
        { withCredentials: true }
      );

      // Refresh playlists
      if (currentUser) {
        const playlistsRes = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/playlists/user/${currentUser._id}`,
          { withCredentials: true }
        );
        setPlaylists(playlistsRes.data.data);
      }

      // Reset form
      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setShowCreateForm(false);
      alert("Playlist created and video added!");
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-[#121212] p-6">
          <p className="text-center text-white">Loading playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#121212] p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Save to playlist</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
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

        {/* Playlists List */}
        <div className="mb-4 max-h-64 overflow-y-auto">
          {playlists.length > 0 ? (
            <ul className="space-y-2">
              {playlists.map((playlist) => {
                const isInPlaylist = isVideoInPlaylist(playlist);
                return (
                  <li key={playlist._id}>
                    <label className="group/label flex cursor-pointer items-center gap-x-3 rounded p-2 hover:bg-white/10">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={isInPlaylist}
                        onChange={() =>
                          handleTogglePlaylist(playlist._id, isInPlaylist)
                        }
                      />
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-transparent text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:bg-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span className="text-white">{playlist.name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No playlists yet</p>
          )}
        </div>

        {/* Create New Playlist */}
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee]"
          >
            + Create New Playlist
          </button>
        ) : (
          <form onSubmit={handleCreatePlaylist} className="space-y-3">
            <div>
              <label
                htmlFor="playlist-name"
                className="mb-1 block text-sm text-gray-300"
              >
                Playlist Name
              </label>
              <input
                type="text"
                id="playlist-name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                placeholder="Enter playlist name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="playlist-description"
                className="mb-1 block text-sm text-gray-300"
              >
                Description
              </label>
              <textarea
                id="playlist-description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                placeholder="Enter description"
                rows="3"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={creating}
                className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee] disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewPlaylistName("");
                  setNewPlaylistDescription("");
                }}
                className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PlaylistPopup;
