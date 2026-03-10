/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MyPlaylistsPage() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Fetch user playlists
  useEffect(() => {
    if (currentUser) {
      fetchPlaylists();
    }
  }, [currentUser]);

  const fetchPlaylists = async () => {
    if (!currentUser) return;
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

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://youtube-backend-psi.vercel.app/api/v1/playlists",
        formData,
        { withCredentials: true }
      );
      setShowCreateModal(false);
      setFormData({ name: "", description: "" });
      fetchPlaylists();
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist");
    }
  };

  const handleUpdatePlaylist = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://youtube-backend-psi.vercel.app/api/v1/playlists/${editingPlaylist._id}`,
        formData,
        { withCredentials: true }
      );
      setShowEditModal(false);
      setEditingPlaylist(null);
      setFormData({ name: "", description: "" });
      fetchPlaylists();
    } catch (error) {
      console.error("Error updating playlist:", error);
      alert("Failed to update playlist");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) {
      return;
    }
    try {
      await axios.delete(
        `https://youtube-backend-psi.vercel.app/api/v1/playlists/${playlistId}`,
        { withCredentials: true }
      );
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
      alert("Failed to delete playlist");
    }
  };

  const openEditModal = (playlist) => {
    setEditingPlaylist(playlist);
    setFormData({ name: playlist.name, description: playlist.description });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-white">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-wrap gap-x-4 gap-y-10 p-4">
          <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">My Playlists</h1>
              <button
                onClick={() => setShowCreateModal(true)}
                className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee]"
              >
                + Create Playlist
              </button>
            </div>

            {playlists.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {playlists.map((playlist) => (
                  <div
                    key={playlist._id}
                    className="group relative overflow-hidden rounded-lg bg-[#1a1a1a]"
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/userProfile/${currentUser.userName}/playlist/${playlist._id}`
                        )
                      }
                      className="w-full"
                    >
                      <div className="relative mb-2 w-full pt-[56%]">
                        <div className="absolute inset-0">
                          <img
                            src={
                              playlist?.videoData?.[0]?.thumbnail ||
                              "https://via.placeholder.com/320x180?text=No+Videos"
                            }
                            alt={playlist.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0">
                            <div className="relative border-t bg-white/30 p-2 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                              <div className="relative z-[1]">
                                <p className="flex justify-between text-sm">
                                  <span>Playlist</span>
                                  <span>
                                    {playlist.videos?.length || 0} videos
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="p-3">
                      <h3 className="mb-1 font-semibold text-white">
                        {playlist.name}
                      </h3>
                      <p className="mb-2 text-sm text-gray-400 line-clamp-2">
                        {playlist.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {playlist.totalViews || 0} Views
                      </p>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => openEditModal(playlist)}
                          className="flex-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlaylist(playlist._id)}
                          className="flex-1 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="mb-4 text-xl text-gray-400">
                  No playlists yet
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-lg bg-[#ae7aff] px-6 py-3 font-semibold text-black hover:bg-[#9c6cee]"
                >
                  Create Your First Playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg bg-[#121212] p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Create Playlist
            </h2>
            <form onSubmit={handleCreatePlaylist}>
              <div className="mb-4">
                <label className="mb-2 block text-sm text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                  rows="4"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee]"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ name: "", description: "" });
                  }}
                  className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg bg-[#121212] p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Edit Playlist
            </h2>
            <form onSubmit={handleUpdatePlaylist}>
              <div className="mb-4">
                <label className="mb-2 block text-sm text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-600 bg-[#1a1a1a] px-3 py-2 text-white outline-none focus:border-[#ae7aff]"
                  rows="4"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black hover:bg-[#9c6cee]"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPlaylist(null);
                    setFormData({ name: "", description: "" });
                  }}
                  className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPlaylistsPage;
