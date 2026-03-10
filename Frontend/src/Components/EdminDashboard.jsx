import React , {useEffect,useState}from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function EdminDashboard() {

  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoadingData] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [likeData, setLikeData] = useState([]);
  const [mergedVideoData, setMergedVideoData] = useState([]);
  const [error, setError] = useState(null);
  const [load , setLoadData] = useState(false);

  // Fetch Admin Data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(
          "https://youtube-backend-psi.vercel.app/api/v1/users/current-user",
          { withCredentials: true }
        );
        setAdmin(res.data.data);
      } catch (err) {
        setError("Failed to fetch admin data");
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchAdminData();
  }, []);

  // Fetch Video Data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await axios.get("https://youtube-backend-psi.vercel.app/api/v1/videos", {
          withCredentials: true,
        });
        setVideoData(res.data.data.docs);
      } catch (err) {
        setError("Failed to fetch video data");
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchVideoData();
  }, [admin, load]);

  // Filter Videos Owned by Admin
  useEffect(() => {
    if (videoData.length > 0 && admin) {
      const filtered = videoData.filter((video) => video.owner === admin._id);
      setFilteredVideos(filtered);
    }
  }, [videoData, admin, load]);


  // Fetch Liked Videos
  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        if (admin) {
          const res = await axios.get("https://youtube-backend-psi.vercel.app/api/v1/likes/video", {
            withCredentials: true,
          });
          setLikeData(res.data.data);
        }
      } catch (err) {
        setError("Error fetching liked videos");
        console.error(err);
      }
    };
    fetchLikedVideos();
  }, [admin,load]);

  // Calculate Video Frequency
  // useEffect(() => {
  //   const mergeData = async () => {
  //     if (videoData.length > 0 && likeData.length > 0) {
  //       const likeCountMap = {};

  //       // Process like data asynchronously
  //       for (const like of likeData) {
  //         try {
  //           const videoId = like.videoDetails._id; // Assuming _id is the unique identifier
  //           const res = await axios.get(`https://youtube-backend-psi.vercel.app/api/v1/videos/v/${videoId}`);
  //           const video = res.data.data;

  //           if (!likeCountMap[videoId]) {
  //             likeCountMap[videoId] = {
  //               likeCount: 0,
  //               details: video, // Add video details for merged data
  //             };
  //           }
  //           likeCountMap[videoId].likeCount += 1;
  //         } catch (error) {
  //           console.error(
  //             `Error fetching video for ID ${like.videoDetails._id}:`,
  //             error
  //           );
  //         }
  //       }

  //       // Merge like counts with video data
  //       const mergedData = videoData.map((video) => ({
  //         ...video,
  //         likeCount: likeCountMap[video._id]?.likeCount || 0,
  //         videoDetails: likeCountMap[video._id]?.details || {},
  //       }));

  //       setMergedVideoData(mergedData);
  //       console.log(mergedData);
  //     }
  //   };

  //   mergeData();
  // }, [videoData, likeData]);

    useEffect(() => {
      if (videoData.length > 0 && likeData.length > 0) {
        const likeCountMap = {};

        // Create a frequency map from likeData
        likeData.forEach((like) => {
          const videoId = like.videoDetails._id; // Assuming _id is the unique identifier
          likeCountMap[videoId] = (likeCountMap[videoId] || 0) + 1;
        });

        // Merge like counts into videoData
        const merged = filteredVideos.map((video) => ({
          ...video,
          likeCount: likeCountMap[video._id] || 0, // Default to 0 if no likes
        }));

        setMergedVideoData(merged);
      }
    }, [videoData, likeData, load]);


  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };
  const handleCheckboxChange = async (videoId) => {
    try {
      // Make the API call to toggle the publish status
      const res = await axios.patch(
        `https://youtube-backend-psi.vercel.app/api/v1/videos/uv/${videoId}/toggle-publish`,
        {},
        { withCredentials: true }
      );
      setLoadData(!load);
    } catch (error) {
      console.error("Error toggling video publish status:", error);
    }
  };
  const deleteVideo = async (videoId) => {
     try {
       // Make the API call to toggle the publish status
       const res = await axios.delete(
         `https://youtube-backend-psi.vercel.app/api/v1/videos/uv/${videoId}`,
         { withCredentials: true }
       );
       setLoadData(!load);
     } catch (error) {
       console.error("Error toggling video publish status:", error);
     }
  }

  
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="w-full min-w-[1200px] border-collapse border text-white">
          <thead>
            <tr>
              <th className="border-collapse border-b p-4">Status</th>
              <th className="border-collapse border-b p-4">Status</th>
              <th className="border-collapse border-b p-4">Uploaded</th>
              <th className="border-collapse border-b p-4">Rating</th>
              <th className="border-collapse border-b p-4">Date uploaded</th>
              <th className="border-collapse border-b p-4"></th>
            </tr>
          </thead>
          <tbody>
            {mergedVideoData?.length > 0 ? (
              mergedVideoData.map((video, index) => (
                <tr className="group border" key={index}>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    <div className="flex justify-center">
                      <label
                        htmlFor={`vid-pub-${video._id}`}
                        className="relative inline-block w-12 cursor-pointer overflow-hidden"
                      >
                        <input
                          type="checkbox"
                          id={`vid-pub-${video._id}`}
                          className="peer sr-only"
                          checked={video.published}
                          onChange={() => handleCheckboxChange(video._id)}
                        />
                        <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                      </label>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    <div className="flex justify-center">
                      <span
                        className={`${
                          video.published
                            ? "bg-green-200 text-green-700"
                            : "bg-gray-200 text-red-700"
                        } inline-block rounded-2xl border px-1.5 py-0.5`}
                      >
                        {video.published ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    <div className="flex items-center gap-4">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={video.thumbnail}
                        // src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Code Master"
                      />
                      <h3 className="font-semibold">{video.title}</h3>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    <div className="flex justify-center gap-4">
                      <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                        {video.likeCount} likes
                      </span>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    {video.createdAt.slice(0, 10)}
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                    <div className="flex gap-4">
                      <button
                        className="h-5 w-5 hover:text-[#ae7aff]"
                        onClick={() => deleteVideo(video._id)}
                      >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="h-5 w-5 hover:text-[#ae7aff]"
                        onClick={() =>
                          navigate(`/editevideodetails/${video._id}`)
                        }
                      >
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p> No Video Available. </p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EdminDashboard
