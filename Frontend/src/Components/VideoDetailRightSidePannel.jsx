import React from 'react'
import { useState , useEffect } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
function VideoDetailRightSidePannel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://youtube-backend-psi.vercel.app/api/v1/videos",
          withCredentials:true,
        });
        setVideos(res.data.data.docs);
      } catch (err) {
        setError(err.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []); // Empty dependency array - fetch only once
  // console.log(videos[0].duration);
  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div className="w-full gap-x-2 border pr-2 md:flex" key={index}>
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <button
                    onClick={() => {
                      navigate(`/video/${video._id}`);
                    }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={video.thumbnail}
                        alt="Video Thumbnail"
                        className="h-full w-full"
                      />
                    </div>
                  </button>
                  <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                    {(video.duration / 60).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className=" gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <button
                  onClick={() =>
                    navigate(
                      `/userProfile/${video.ownerDetails.userName}/videos`
                    )
                  }
                >
                  <div className="flex pb-2 pt-2">
                    <div className="h-12 w-12 shrink-0 ">
                      <img
                        src={video.ownerDetails.avatar}
                        alt="Avatar"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="w-full pt-1 md:pt-0">
                      <h6 className="flex ml-3 mb-1 text-sm font-semibold">
                        {video.title}
                      </h6>
                      <p className="flex ml-3 mb-0.5 mt-2 text-sm text-gray-200">
                        {video.ownerDetails.userName}
                      </p>
                    </div>
                  </div>
                </button>
                <p className="flex text-sm text-gray-200">
                  {video.views} Views ·{" "}
                  {Math.floor(
                    (new Date() - new Date(video.createdAt)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  day ago
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No video found</div>
        )}
      </div>
    </>
  );
}

export default VideoDetailRightSidePannel
