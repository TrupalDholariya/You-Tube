/** @format */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChannelPageListSelection() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [activeButton, setActiveButton] = useState("videos"); // Set default active button

  const handleClick = (button) => {
    setActiveButton(button);
    navigate(button);
  };

  return (
    <>
      <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        <li className="w-full">
          <button
            className={`w-full border-b-2 px-3 py-1.5 ${
              activeButton === "videos"
                ? "bg-[#ae7aff] text-white"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => handleClick("videos")}
          >
            Videos
          </button>
        </li>
        <li className="w-full">
          <button
            className={`w-full border-b-2 px-3 py-1.5 ${
              activeButton === "playlist"
                ? "bg-[#ae7aff] text-white"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => handleClick("playlist")}
          >
            Playlist
          </button>
        </li>
        <li className="w-full">
          <button
            className={`w-full border-b-2 px-3 py-1.5 ${
              activeButton === "tweet"
                ? "bg-[#ae7aff] text-white"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => handleClick("tweet")}
          >
            Tweets
          </button>
        </li>
        <li className="w-full">
          <button
            className={`w-full border-b-2 px-3 py-1.5 ${
              activeButton === "subscribed"
                ? "bg-[#ae7aff] text-white"
                : "bg-transparent text-gray-400"
            }`}
            onClick={() => handleClick("subscribed")}
          >
            Subscribed
          </button>
        </li>
      </ul>
    </>
  );
}

export default ChannelPageListSelection;
