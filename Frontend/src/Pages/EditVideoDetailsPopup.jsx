import React ,{useEffect, useState} from 'react'
import Header from '../Components/Header/Header';
import EdminDashboard from '../Components/EdminDashboard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function EditVideoDetailsPopup() {
  const {videoId } = useParams();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(null);
  const [videoDdata, setVideoData] = useState(null);
  const [title, setTitle] = useState("State Management with Redux");
  const [description, setDescription] = useState(
    "State Management with Redux is a comprehensive guidebook that delves into the principles and practices of managing application state in JavaScript-based web development. It explores the Redux library, a popular tool for handling state in complex applications, providing practical insights and best practices for effectively managing data flow. This book equips developers with the knowledge and skills needed to architect robust and maintainable front-end applications, making it an essential resource for anyone seeking to master state management in modern web development."
  );
  const [loading, setLoading] = useState(false);
  const [errorr, setError] = useState(false);

  const handleThumbnail = (event) => setThumbnail(event.target.files[0]);

  useEffect(() => {
    console.log(videoId )
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/videos/v/${videoId }`,
          { withCredentials: true }
        );
        // console.log("working");
        setVideoData(res.data.data);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setThumbnail(res.data.data.thumbnail);
        console.log(res.data);
      } catch (error) {
        // console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [videoId ]); 

   const handleTitleChange = (e) => {
     setTitle(e.target.value);
   };

   const handleDescriptionChange = (e) => {
     setDescription(e.target.value);
   };

   const handlesubmit = async () => {
     try {
       const formData = new FormData();
       if (title) formData.append("title", title);
       if (description) formData.append("description", description);
       if (thumbnail instanceof File) formData.append("thumbnail", thumbnail); // Only append if it's a File

       const res = await axios.patch(
         `https://youtube-backend-psi.vercel.app/api/v1/videos/uv/${videoId}`,
         formData,
         {
           withCredentials: true,
           headers: {
             "Content-Type": "multipart/form-data",
           },
         }
       );

       console.log("Video updated:", res.data);
       navigate("/edmindashboard"); // Redirect after update
     } catch (error) {
       console.error("Update failed:", error.response?.data || error.message);
     }
   };
  

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
          {/* <Header /> */}
          <div className="relative flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            {/* <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="block">
                <h1 className="text-2xl font-bold">
                  Welcome Back, React Patterns
                </h1>
                <p className="text-sm text-gray-300">
                  Seamless Video Management, Elevated Results.
                </p>
              </div>
              <div className="block">
                <button className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
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
                <p className="text-3xl font-semibold">221,234</p>
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
                <p className="text-3xl font-semibold">4,053</p>
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
                <p className="text-3xl font-semibold">63,021</p>
              </div>
            </div>
            <EdminDashboard />
          </div> */}
            <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
              <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-xl font-semibold">
                    Edit Video
                    <span className="block text-sm text-gray-300">
                      Share where you've worked on your profile.
                    </span>
                  </h2>
                  <button
                    className="h-6 w-6"
                    onClick={() => navigate("/edmindashboard")}
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
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <label htmlFor="thumbnail" className="mb-1 inline-block">
                  Thumbnail<sup>*</sup>
                </label>
                <label
                  className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
                  htmlFor="thumbnail"
                >
                  <input
                    type="file"
                    className="sr-only"
                    id="thumbnail"
                    onChange={handleThumbnail}
                  />
                  <img
                    src={thumbnail}
                    alt="State Management with Redux"
                  />
                </label>
                <div className="mb-6 flex flex-col gap-y-4">
                  <div className="w-full">
                    <label htmlFor="title" className="mb-1 inline-block">
                      Title<sup>*</sup>
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="w-full border bg-transparent px-2 py-1 outline-none"
                      value={title}
                      onChange={handleTitleChange}
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
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border px-4 py-3">Cancel</button>
                  <button
                    className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
                    onClick={handlesubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVideoDetailsPopup
