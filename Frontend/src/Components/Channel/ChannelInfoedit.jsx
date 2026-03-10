/** @format */

import React, { useState } from "react";

function ChannelInfoEdit() {
  // State hooks to manage form values
  const [username, setUsername] = useState("reactpatterns");
  const [description, setDescription] = useState(
    "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
  );
  const [fontSize, setFontSize] = useState("regular");
  const [timezone, setTimezone] = useState("UTC+05:30");

  // Handlers for form fields
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleTimezoneChange = (e) => setTimezone(e.target.value);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-y-4 py-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <h5 className="font-semibold">Channel Info</h5>
          <p className="text-gray-300">Update your Channel details here.</p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <div className="rounded-lg border">
            <div className="flex flex-wrap gap-y-4 p-4">
              <div className="w-full">
                <label className="mb-1 inline-block" htmlFor="username">
                  Username
                </label>
                <div className="flex rounded-lg border">
                  <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">
                    vidplay.com/
                  </p>
                  <input
                    type="text"
                    className="w-full bg-transparent px-2 py-1.5"
                    id="username"
                    placeholder="@username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-1 inline-block" htmlFor="desc">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                  rows="4"
                  id="desc"
                  placeholder="Channel Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <p className="mt-0.5 text-sm text-gray-300">
                  275 characters left
                </p>
              </div>
              <div className="flex w-full items-center gap-3">
                <div className="w-full max-w-xs rounded-lg border">
                  <select
                    className="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-2"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                  >
                    <option value="light">Light</option>
                    <option value="regular">Regular</option>
                    <option value="semi-bold">Semi bold</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                  </select>
                </div>
                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                  <svg
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.6 6.79C9.57 6.12 10.25 5.02 10.25 4C10.25 1.74 8.5 0 6.25 0H0V14H7.04C9.13 14 10.75 12.3 10.75 10.21C10.75 8.69 9.89 7.39 8.6 6.79ZM3 2.5H6C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5H3V2.5ZM6.5 11.5H3V8.5H6.5C7.33 8.5 8 9.17 8 10C8 10.83 7.33 11.5 6.5 11.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                  <svg
                    width="20"
                    height="10"
                    viewBox="0 0 20 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
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
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    ></path>
                  </svg>
                </button>
                <button className="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="w-full">
                <label className="mb-1 inline-block" htmlFor="timezone">
                  Timezone
                </label>
                <div className="relative w-full rounded-lg border">
                  <div className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="6" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <select
                    id="timezone"
                    className="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-8"
                    value={timezone}
                    onChange={handleTimezoneChange}
                  >
                    <option value="UTC-12:00">
                      (UTC-12:00) International Date Line West
                    </option>
                    <option value="UTC-11:00">
                      (UTC-11:00) Midway Island, Samoa
                    </option>
                    <option value="UTC-10:00">(UTC-10:00) Hawaii</option>
                    <option value="UTC-09:00">(UTC-09:00) Alaska</option>
                    <option value="UTC-08:00">
                      (UTC-08:00) Pacific Time (US & Canada)
                    </option>
                    <option value="UTC-07:00">
                      (UTC-07:00) Mountain Time (US & Canada)
                    </option>
                    <option value="UTC-06:00">
                      (UTC-06:00) Central Time (US & Canada)
                    </option>
                    <option value="UTC-05:00">
                      (UTC-05:00) Eastern Time (US & Canada)
                    </option>
                    <option value="UTC-04:00">
                      (UTC-04:00) Atlantic Time (Canada)
                    </option>
                    <option value="UTC-03:00">
                      (UTC-03:00) Buenos Aires, Georgetown
                    </option>
                    <option value="UTC-02:00">(UTC-02:00) Mid-Atlantic</option>
                    <option value="UTC-01:00">(UTC-01:00) Azores</option>
                    <option value="UTC+00:00">
                      (UTC+00:00) Dublin, Edinburgh, Lisbon, London
                    </option>
                    <option value="UTC+01:00">
                      (UTC+01:00) Amsterdam, Berlin, Brussels, Copenhagen
                    </option>
                    <option value="UTC+02:00">
                      (UTC+02:00) Athens, Bucharest, Istanbul
                    </option>
                    <option value="UTC+03:00">
                      (UTC+03:00) Moscow, St. Petersburg, Volgograd
                    </option>
                    <option value="UTC+04:00">(UTC+04:00) Dubai, Muscat</option>
                    <option value="UTC+05:00">(UTC+05:00) Yekaterinburg</option>
                    <option value="UTC+05:30">
                      (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                    </option>
                    <option value="UTC+06:00">
                      (UTC+06:00) Almaty, Novosibirsk
                    </option>
                    <option value="UTC+07:00">
                      (UTC+07:00) Bangkok, Hanoi, Jakarta
                    </option>
                    <option value="UTC+08:00">
                      (UTC+08:00) Beijing, Perth, Singapore, Hong Kong
                    </option>
                    <option value="UTC+09:00">
                      (UTC+09:00) Tokyo, Seoul, Osaka
                    </option>
                    <option value="UTC+10:00">(UTC+10:00) Sydney, Guam</option>
                    <option value="UTC+11:00">
                      (UTC+11:00) Solomon Islands, New Caledonia
                    </option>
                    <option value="UTC+12:00">
                      (UTC+12:00) Fiji, Kamchatka, Marshall Islands
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <hr className="border border-gray-300" />
            <div className="flex items-center justify-end gap-4 p-4">
              <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                Cancel
              </button>
              <button className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelInfoEdit;
