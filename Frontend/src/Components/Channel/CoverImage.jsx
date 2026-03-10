/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";

function CoverImage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchcurrUser = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://youtube-backend-psi.vercel.app/api/v1/users/current-user",
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchcurrUser();
  }, []);

  return (
    <>
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          {
            user?.coverImage ? (
            <img
              src={user.coverImage}
              alt="cover-photo"
              className="object-cover w-full h-full"
            />
            ) : (
              <p>Loading cover image...</p>
            )
          }
        </div>
      </div>
    </>
  );
}

export default CoverImage;
