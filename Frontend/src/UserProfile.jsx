import React from 'react'
import { Outlet } from 'react-router-dom';
import AvatarAndChannelDetail from './Components/Channel/AvatarAndChannelDetail';
import ChannelPageListSelection from './Components/Channel/ChannelPageListSelection';
import CoverImage from './Components/Channel/CoverImage';

function UserProfile() {
  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <CoverImage />
        <div className="px-4 pb-4">
          <AvatarAndChannelDetail />
          <ChannelPageListSelection />
            <Outlet />
        </div>
      </section>
    </>
  );
}

export default UserProfile
