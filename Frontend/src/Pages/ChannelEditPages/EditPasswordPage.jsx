import React from 'react'
import Header from '../../Components/Header/Header';
import Left_Header from '../../Components/Left_Header/Left_Header';
import CoverImage from '../../Components/Channel/CoverImage';
import AvatarAndChannelDetail from '../../Components/Channel/AvatarAndChannelDetail';
import ChannelEditListSelection from '../../Components/Channel/ChannelEditListSelection';
import PasswordEdit from '../../Components/Channel/PasswordEdit';

function EditPasswordPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
      />
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Left_Header />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <CoverImage />
            <div className="px-4 pb-4">
              <AvatarAndChannelDetail />
              <ChannelEditListSelection />
              <PasswordEdit />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default EditPasswordPage
