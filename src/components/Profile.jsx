import React from "react";
import { constants } from "@utils/constants";

const Profile = ({ user, onPlusClick, friendId, isOnline }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="container bg-gray-100 mx-auto max-w-sm rounded-lg overflow-hidden shadow-lg my-4 ">
          <div
            className="relative z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))",
            }}
          >
            <img
              className="w-full"
              src={constants.getAvatar(user?.profile_url)}
              alt="Profile image"
            />
            <div
              className="text-center absolute w-full"
              style={{ bottom: "4rem" }}
            >
              <span className="text-yellow-100 tracking-wide uppercase text-lg font-bold shadow bg-slate-700 p-2 rounded-lg opacity-90">
                {user?.username || "N/A"}
              </span>
            </div>
          </div>
          <div className="relative flex justify-between items-center flex-row px-6 z-50 -mt-10">
            <p className="flex items-center text-gray-400">
              <span
                className={`inline-block w-3 h-3 ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                } rounded-full mr-2`}
              />
              {isOnline ? "Online" : "Offline"}
            </p>
            {!friendId ? (
              <button
                className="p-4 ml-auto bg-red-600 rounded-full hover:bg-red-500 focus:bg-red-700 transition ease-in duration-200 focus:outline-none"
                onClick={onPlusClick}
              >
                <svg
                  viewBox="0 0 20 20"
                  enableBackground="new 0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fill="#FFFFFF"
                    d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                            C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                            C15.952,9,16,9.447,16,10z"
                  />
                </svg>
              </button>
            ) : null}
          </div>

          <div className="pt-6 pb-8 text-gray-600 text-center">
            <p>Photographer from Espírito Santo - Brazil</p>
            <p className="text-sm">
              be such a beautiful soul that people crave your vibes.
            </p>
          </div>
          <div className="pb-10 uppercase text-center tracking-wide flex justify-around">
            <div className="posts">
              <p className="text-gray-400 text-sm">Posts</p>
              <p className="text-lg font-semibold text-blue-300">
                {+user?.postCount || 0}
              </p>
            </div>
            <div className="followers">
              <p className="text-gray-400 text-sm">Followers</p>
              <p className="text-lg font-semibold text-blue-300">
                {Math.ceil(Math.random() * 1000)}
              </p>
            </div>
            <div className="following">
              <p className="text-gray-400 text-sm">Following</p>
              <p className="text-lg font-semibold text-blue-300">
                {Math.ceil(Math.random() * 1000)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
