/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChannelTweet() {
  const { userName } = useParams();
  const [currUser, setCurrUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [tweetData, setTweetData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [newTweet, setNewTweet] = useState(""); // New tweet input
  // Fetch current user
  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const res = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/users/current-user`,
          { withCredentials: true }
        );
        setCurrUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrUser();
  }, [userName]);

  // Fetch profile user
  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const res = await axios.get(
          `https://youtube-backend-psi.vercel.app/api/v1/users/c/${userName}`,
          { withCredentials: true }
        );
        setProfileUser(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileUser();
  }, [userName]);

  // Fetch tweet likes
  const fetchLikeData = async () => {
    try {
      const res = await axios.get(`https://youtube-backend-psi.vercel.app/api/v1/likes/tweet`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      setLikeData(res.data.data);
    } catch (error) {
      console.log("Error in fetching likes: " + error);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, [profileUser]);

  // Fetch tweet data
  const fetchTweetData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://youtube-backend-psi.vercel.app/api/v1/tweets/user/${profileUser._id}`,
        withCredentials: true,
      });
      setTweetData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (profileUser) {
      fetchTweetData();
    }
  }, [profileUser]);

  // Helper function to get the total likes for each tweet
  const getTweetLikes = (tweetId) => {
    const likes = likeData.filter((like) => like.tweet === tweetId).length;
    console.log(likes);
    return likes;
  };

  // Check if current user has liked the tweet
  const isTweetLikedByCurrentUser = (tweetId) => {
    const islike = likeData.some(
      (like) => like.tweet === tweetId && like.LikedBy === currUser._id
    );
    return islike;
  };

  // Handle like/unlike for each tweet
  const handleToggleLiked = async (tweetId) => {
    console.log(tweetId);
    try {
      const ress = await axios.post(
        `https://youtube-backend-psi.vercel.app/api/v1/likes/toggle/t/${tweetId}`,
        {},
        { withCredentials: true }
      );
      console.log("asdfgh", ress);
      fetchLikeData();
      fetchTweetData();
      // console.log(likeData)
    } catch (error) {
      console.log("Error toggling like: " + error);
    }
  };
  // ✅ Handle new tweet submission
  const handleTweetSubmit = async () => {
    if (!newTweet.trim()) return;

    try {
      await axios.post(
        `https://youtube-backend-psi.vercel.app/api/v1/tweets`,
        { content: newTweet },
        { withCredentials: true }
      );
      setNewTweet(""); // clear input box
      fetchTweetData(); // refresh tweets
    } catch (error) {
      console.log("Error posting tweet: " + error);
    }
  };

  return (
    <>
      <div className="py-4">
        {/* ✅ Tweet input box */}
        {currUser && currUser.userName === userName && (
          <div className="mb-6">
            <textarea
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              rows={3}
            ></textarea>
            <button
              onClick={handleTweetSubmit}
              className="mt-2 px-4 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white"
            >
              Tweet
            </button>
          </div>
        )}

        {/* ✅ Tweets list */}
        {tweetData && tweetData.length > 0 ? (
          tweetData.map((tweet, index) => (
            <div
              className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent"
              key={index}
            >
              <div className="h-14 w-14 shrink-0">
                <img
                  src={tweet.ownerDetails.coverImage}
                  alt="Profile"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full">
                <h4 className="mb-1 flex items-center gap-x-2">
                  <span className="font-semibold">
                    {tweet.ownerDetails.userName}
                  </span>
                   
                  <span className="inline-block text-sm text-gray-400">
                    {(
                      (new Date() - new Date(tweet.createdAt)) /
                      (1000 * 60 * 60 * 24)
                    ).toFixed(0)}{" "}
                    days ago
                  </span>
                </h4>
                <p className="mb-2">{tweet.content}</p>
                <div className="flex gap-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none"
                    onClick={() => handleToggleLiked(tweet._id)}
                  >
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className={`h-5 w-5 ${
                        isTweetLikedByCurrentUser(tweet._id)
                          ? "text-[#ae7aff]"
                          : "text-[#ffffff]"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      ></path>
                    </svg>
                    {getTweetLikes(tweet._id)}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>0 Tweets</h1>
        )}
      </div>
    </>
  );
}

export default ChannelTweet;
