import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Left_Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); 

  return (
    <>
      <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
        <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
          <li className="">
            <button
              className={`flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`}
              onClick={() => navigate("/")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Home
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/user/likedvideo")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Liked Video
              </span>
            </button>
          </li>
          <li className="">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/user/history")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                History
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/myplaylists")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 6v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                My Playlists
              </span>
            </button>
          </li>
          {/* <li className="hidden sm:block">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/home")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                My Content
              </span>
            </button>
          </li> */}
{/*           <li className="">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/home")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Collection
              </span>
            </button>
          </li> */}
          {/* <li className="">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/home")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Subsribers
              </span>
            </button>
          </li> */}
          <li className="hidden sm:block mt-auto">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/support")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Support
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate(`/userProfile/${currentUser?.userName}/videos`)}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                User Profile
              </span>
            </button>
          </li>
          {/* <li className="hidden sm:block">
            <button
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
              onClick={() => navigate("/edmindashboard")}
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Admin Dashboard
              </span>
            </button>
          </li> */}
        </ul>
      </aside>
    </>
  );
}

export default Left_Header;
