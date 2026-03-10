import React, { useEffect, useState } from 'react'
import EdminDashboard from '../Components/EdminDashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EdminDashboardPage() {

  const navigate = useNavigate();
 const [totalView, setTotalView] = useState(0);
 const [videoData, setVideoData] = useState([]);
 const [filteredVideos, setFilteredVideos] = useState([]);
 const [loading, setLoadingData] = useState(true);
 const [admin, setAdmin] = useState(null);
 const [subscription, setSubscription] = useState(null);
 const [likeData, setLikeData] = useState([]);
 const [totalLikes, setTotalLikes] = useState(0);
  const [mergedVideoData, setMergedVideoData] = useState([]);
 const [error, setError] = useState(null);

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
       const res = await axios.get("https://youtube-backend-psi.vercel.app/api/v1/videos", {withCredentials:true});
       setVideoData(res.data.data.docs);
     } catch (err) {
       setError("Failed to fetch video data");
       console.error(err);
     } finally {
       setLoadingData(false);
     }
   };

   fetchVideoData();
 }, [admin]);

 // Filter Videos Owned by Admin
 useEffect(() => {
   if (videoData.length > 0 && admin) {
     const filtered = videoData.filter((video) => video.owner === admin._id);
    //  console.log("krish",filtered)
     setFilteredVideos(filtered);
   }
 }, [videoData, admin]);

 // Calculate Total Views
 useEffect(() => {
  // console.log(filteredVideos)
   if (filteredVideos.length > 0) {
     const totalViews = filteredVideos.reduce(
       (sum, video) => sum + (video.views || 0),
       0
     );
     setTotalView(totalViews);
   }
 }, [filteredVideos]);
//  console.log(filteredVideos)
 // Fetch Subscriptions
 useEffect(() => {
   const fetchSubscriptions = async () => {
     try {
       if (admin) {
         const res = await axios.get(
           `https://youtube-backend-psi.vercel.app/api/v1/subscriptions/u/${admin._id}`,
           { withCredentials: true }
         );
         setSubscription(res.data.data);
       }
     } catch (err) {
       setError("Failed to fetch subscription data");
       console.error(err);
     } finally {
       setLoadingData(false);
     }
   };

   fetchSubscriptions();
 }, [admin]);

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
 }, [admin]);

 // Calculate Total Likes
 useEffect(() => {
   if (likeData.length > 0 && admin) {
     const totalLikes = likeData.filter(
       (li) => li.videoDetails.owner === admin._id
     ).length;
     setTotalLikes(totalLikes);
   }
 }, [likeData, admin]);

 // Calculate Video Frequency
useEffect(() => {
  if (videoData.length > 0 && likeData.length > 0) {
    // Calculate like counts for each video
    const likeCounts = likeData.reduce((acc, like) => {
      const videoId = like.videoDetails._id;
      acc[videoId] = (acc[videoId] || 0) + 1;
      return acc;
    }, {});

    // Merge like counts with video data
    const mergedData = filteredVideos.map((video) => ({
      ...video,
      likeCount: likeCounts[video._id] || 0, // Default to 0 if no likes
    }));

    setMergedVideoData(mergedData);
    // console.log(mergedVideoData);
  }
}, [videoData, likeData]);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="block">
              <h1 className="text-2xl font-bold">
                Welcome Back, {admin? admin.userName:"Noob"}
              </h1>
              <p className="text-sm text-gray-300">
                Seamless Video Management, Elevated Results.
              </p>
            </div>
            <div className="block">
              <button
                className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                onClick={() => navigate("/uploadvideo")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>{" "}
                Upload video
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total views</h6>
              <p className="text-3xl font-semibold">{totalView}</p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total subscribers</h6>
              <p className="text-3xl font-semibold">
                {subscription ? subscription.length : 0}
              </p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    ></path>
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total likes</h6>
              <p className="text-3xl font-semibold">{totalLikes}</p>
            </div>
          </div>
          <EdminDashboard />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default EdminDashboardPage
