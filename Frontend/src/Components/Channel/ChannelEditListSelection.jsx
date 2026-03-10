import React from 'react'

function ChannelEditListSelection() {
  return (
    <>
      <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        <li className="w-full">
          <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
            Personal Information
          </button>
        </li>
        <li className="w-full">
          <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
            Channel Information
          </button>
        </li>
        <li className="w-full">
          <button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
            Change Password
          </button>
        </li>
      </ul>
    </>
  );
}

export default ChannelEditListSelection
