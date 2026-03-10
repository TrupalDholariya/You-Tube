  import React ,{useEffect} from 'react'
  import Header from '../Components/Header/Header';
  import Left_Header from '../Components/Left_Header/Left_Header';
  import VideoDetailRightSidePannel from "../Components/VideoDetailRightSidePannel";
  import PlaylistPopup from '../Components/PlaylistPopup';
  import axios from 'axios';
  import { useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { useRef } from 'react';
  import { useSelector } from 'react-redux';
  

  function VideoDetailPage() {
  
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [toggleSubscribed, setToggleSubscribed] = useState(0);
  const [toggleLike , setToggleLike] = useState(0)
  const [view , setView] = useState(null)
  const [like, setLike] = useState(null);
  const [totalVideoLike , setTotalVideoLike] = useState(0);
  const hasFatch =useRef(false);
  const [commentData, setCommentData] = useState(null)
  const [addComment ,setAddComment]  = useState('');
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);

  // Reset all state when videoId changes
  useEffect(() => {
    // Reset all state
    setVideoData(null);
    setLoading(true);
    setError(null);
    setOwnerData(null);
    setSubscription(null);
    setToggleSubscribed(0);
    setToggleLike(0);
    setView(null);
    setLike(null);
    setTotalVideoLike(0);
    setCommentData(null);
    setAddComment('');
    setRefreshComments(0);
    hasFatch.current = false;
    
    // Scroll to top when video changes
    window.scrollTo(0, 0);
  }, [videoId]);

  // fetch video data
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/videos/v/${videoId}`,
          { withCredentials: true }
        );
        setVideoData(res.data.data);
        setOwnerData(res.data.data.ownerDetails[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [videoId]); 

  // fetch subscription
  useEffect(() => {
    if (ownerData) {
      const fetchSubscription = async () => {
        try {
          const res = await axios.get(
            `https://youtube-backend-psi.vercel.app/api/v1/subscriptions/u/${ownerData._id}`,
            { withCredentials: true }
          );
          setSubscription(res.data.data);
        } catch (error) {
          setError(error);
        }
      };
      fetchSubscription();
    }
  }, [ownerData, toggleSubscribed]); 

  // set toggle subscribed
  useEffect(() => {
    if (subscription && currentUser) {
      const isSubscribed = subscription.some(
        (sub) => sub.subscriber._id === currentUser._id
      );
      setToggleSubscribed(isSubscribed ? 1 : 0);
    }
  }, [subscription, currentUser]);

  // fetch view
  useEffect(() => {
  if(!hasFatch.current) {
    const fetchView = async () => {
      try {
        const view = await axios({
          method: "PATCH",
          url: `https://youtube-backend-psi.vercel.app/api/v1/videos/v/${videoId}`,
          withCredentials: true,
        });
        setView(view.data.data.data);
        // console.log(view);
      } catch (error) {
        console.error(error);
      }
    };
    fetchView();
    hasFatch.current = true;
  }
  }, [videoId]);

  // fetch video like
  useEffect(() => {
    const fetchVideolike = async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: `https://youtube-backend-psi.vercel.app/api/v1/likes/video`,
          withCredentials: true,
        });
        setLike(resp.data.data);
        // console.log(resp.data.data);
      } catch (error) {
        console.log("Error in fetching likes: " + error);
      }
    };
    fetchVideolike();
  }, [toggleLike]);

  // set  total video liked 
  useEffect(() => {
    if (like && currentUser ) {
      
       const videolikes = like.filter((li) => li.video === videoId).length;
        // console.log(videolikes)
      setTotalVideoLike(videolikes);
      // console.log(totalVideoLike);
    }
  }, [like, currentUser, videoId]);

  // fetch toggle video like
  useEffect(()=>{
    if(like && currentUser){
      const isliked = like.some(
        (li) => li.video === videoId && li.LikedBy === currentUser._id
      )
      setToggleLike(isliked ? 1 : 0)
    }
  },[like, currentUser, videoId])

    // fetch Comment Data
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://youtube-backend-psi.vercel.app/api/v1/comments/${videoId}`,
          withCredentials: true,
        });
        setCommentData(res.data.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentData();
  }, [videoId, refreshComments]);

  // add video to user watch history
  useEffect(()=>{
    const userWatchHistory = async () =>{
     try {
      const res= await axios({
         method: "POST",
         url: "https://youtube-backend-psi.vercel.app/api/v1/users/addVideoToWatchHistory",
         data :{
          videoId : videoId ,
         },
         withCredentials:true
       });
     } catch (error) {
      console.log(error)
     }
    };
    userWatchHistory();
  },[videoId])
  
  if (loading) return <div>Loading...</div>;
  if (error)  return <div>Error: {error.message}</div>;
   

  // handle toggle subscribed by function
  async function handleToggleSubscribed (){
    if (!currentUser) return;
    try {
      const res = await axios({
        method: "POST",
        url: `https://youtube-backend-psi.vercel.app/api/v1/subscriptions/c/${ownerData._id}`,
        data: {
          userId: `${currentUser._id}`,
        },
        withCredentials: true,
      });
      setToggleSubscribed(res.data.data==1)
    } catch (error) {
      console.log("error" + error)
    }
  }

  // handle toggle liked by function
  async function handleToggleLiked() {
    try {
      const res = await axios({
        method: "POST",
        url: `https://youtube-backend-psi.vercel.app/api/v1/likes/toggle/v/${videoId}`,
        withCredentials:true
      });
      setToggleLike(res.data.data==1);
    } catch (error) {
      console.log("error" + error);
    }
  }

  function handleaddNewComment(){
    if(!addComment) return;
    axios({
      method : "POST",
      url :`https://youtube-backend-psi.vercel.app/api/v1/comments/${videoId}`,
      data :{
        content : addComment
      },
      withCredentials:true
    }).then((res)=>{
      setAddComment('');
      setRefreshComments(prev => prev + 1); // Trigger comment refresh
    })
    .catch((error)=>{
        alert("Add Comment failed. Please check your credentials and try again.");
    })
  }
 
  // set input comment
  const handleAddComment =  (event) => setAddComment(event.target.value);

    return (
      <>
        {/* <div className="h-screen overflow-y-auto bg-[#121212] text-white">
          <Header />
          <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <Left_Header /> */}
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
            <div className="col-span-12 w-full">
              {
                <div className="relative mb-4 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <video
                      key={videoId}
                      className="h-full w-full"
                      controls
                      autoPlay
                      muted={false}
                      src={videoData.videoFile}
                    />
                  </div>
                </div>
              }

              <div
                className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                role="button"
                tabIndex="0"
              >
                <div className="flex flex-wrap gap-y-2">
                  <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                    <h1 className="text-lg font-bold">{videoData.title}</h1>
                    <p className="flex text-sm text-gray-200">
                      {videoData.views} Views ·{" "}
                      {Math.floor(
                        (new Date() - new Date(videoData.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      day ago
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                    <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                      <div className="flex overflow-hidden rounded-lg border">
                        <button
                          className={`group/btn mr-1 flex w-full items-center gap-x-2 ${
                            toggleLike ? "bg-[#ae7aff]" : "bg-[#ffffff]"
                          } px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}
                          onClick={handleToggleLiked}
                        >
                          <span className="inline-block w-5">
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
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              ></path>
                            </svg>
                          </span>

                          <span className="group-focus">{totalVideoLike}</span>
                        </button>
                      </div>
                      <div className="relative block">
                        <button 
                          onClick={() => setShowPlaylistPopup(true)}
                          className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black hover:bg-gray-200"
                        >
                          <span className="inline-block w-5">
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
                                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                              ></path>
                            </svg>
                          </span>
                          Save
                        </button>

                        {/* Add to Playlist */}
                        {/* <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                                <h3 className="mb-4 text-center text-lg font-semibold">
                                  Save to playlist
                                </h3>
                                <ul className="mb-4">
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="Collections-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="Collections-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Collections
                                    </label>
                                  </li>
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="JavaScript Basics-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="JavaScript Basics-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      JavaScript Basics
                                    </label>
                                  </li>
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="C++ Tuts-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="C++ Tuts-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      C++ Tuts
                                    </label>
                                  </li>
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="Feel Good Music-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="Feel Good Music-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Feel Good Music
                                    </label>
                                  </li>
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="Ed Sheeran-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="Ed Sheeran-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Ed Sheeran
                                    </label>
                                  </li>
                                  <li className="mb-2 last:mb-0">
                                    <label
                                      className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      htmlFor="Python-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="peer hidden"
                                        id="Python-checkbox"
                                      />
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Python
                                    </label>
                                  </li>
                                </ul>
                                <div className="flex flex-col">
                                  <label
                                    htmlFor="playlist-name"
                                    className="mb-1 inline-block cursor-pointer"
                                  >
                                    Name
                                  </label>
                                  <input
                                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                    id="playlist-name"
                                    placeholder="Enter playlist name"
                                  />
                                  <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                                    Create new playlist
                                  </button>
                                </div>
                              </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() =>
                        navigate(`/userProfile/${ownerData.userName}/videos`)
                      }
                    >
                      <div className="mt-2 h-12 w-12 shrink-0">
                        <img
                          src={ownerData.avatar}
                          alt="reactpatterns"
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </button>

                    <div className="block">
                      <button
                        onClick={() =>
                          navigate(`/userProfile/${ownerData.userName}/videos`)
                        }
                      >
                        <p className="text-gray-200">{ownerData.userName}</p>
                      </button>

                      <p className="text-sm text-gray-400">
                        <span>{subscription ? subscription.length : 0}</span>
                        <span style={{ marginLeft: "5px" }}>subscribers</span>
                      </p>
                    </div>
                  </div>
                  <div className="block">
                    <button
                      className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                      onClick={handleToggleSubscribed}
                    >
                      <span className="inline-block w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                          ></path>
                        </svg>
                      </span>

                      <span className="group-focus">
                        {toggleSubscribed == 1 ? "UnSubscribe" : "SubScribe"}
                      </span>
                    </button>
                  </div>
                </div>
                <hr className="my-4 border-white" />
                <div className="h-5 overflow-hidden group-focus:h-auto">
                  <p className="text-sm">{videoData.description}</p>
                </div>
              </div>
              <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                <div className="block">
                  <h6 className="mb-4 font-semibold">
                    {" "}
                    {commentData ? commentData.length : 0} Comments
                  </h6>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                    placeholder="Add a Comment"
                    value={addComment}
                    onChange={handleAddComment}
                  />
                  <button
                    className="group/btn mr-0 flex w-full items-center gap-x-1 bg-[#ae7aff] px-2 py-1 mt-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                    onClick={handleaddNewComment}
                  >
                    Add Comment
                  </button>
                </div>

                <hr className="my-4 border-white" />

                {commentData ? (
                  commentData.map((comment, index) => (
                    <div key={index}>
                      <div className="flex gap-x-4">
                        <div className="mt-2 h-11 w-11 shrink-0">
                          <img
                            src={comment.ownerDetails[0].avatar}
                            alt={comment.ownerDetails[0].fullName}
                            className="h-full w-full rounded-full"
                          />
                        </div>
                        <div className="block">
                          <p className="flex items-center text-gray-200">
                            {comment.ownerDetails[0].fullName}&nbsp;&nbsp;
                            <span className="text-sm">
                              {(
                                (new Date() - new Date(comment.createdAt)) /
                                (1000 * 60 * 60 * 24)
                              ).toFixed(2)}{" "}
                              days
                            </span>
                          </p>
                          <p className="text-sm text-gray-200">
                            {comment.ownerDetails[0].userName}
                          </p>
                          <p className="mt-3 text-sm">{comment.content}</p>
                        </div>
                      </div>
                      <hr className="my-4 border-white" />
                    </div>
                  ))
                ) : (
                  <div> Wite first Comment</div>
                )}
              </div>
            </div>
            <VideoDetailRightSidePannel />
          </div>
        </section>
        {/* </div>
        </div> */}
        
        {/* Playlist Popup */}
        {showPlaylistPopup && (
          <PlaylistPopup 
            videoId={videoId} 
            onClose={() => setShowPlaylistPopup(false)} 
          />
        )}
      </>
    );
  }

  export default VideoDetailPage
