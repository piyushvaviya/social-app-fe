import React, { useEffect, useState } from "react";
import postService from "@services/post";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { getParams } from "@utils/urlUtils";
import { messages } from "@utils/messages";

const OurPosts = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const friendId = getParams("friend_id");

  useEffect(() => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    getPosts().catch((err) => {
      const errorMsg = messages.resError(err?.message);
      toast.error(errorMsg);
      navigate("/");
      setLoading(false);
    });
  }, [friendId]);

  const getPosts = async () => {
    const friend = friendId || "";
    setLoading(true);
    const postRes = await postService.getAll(false, friend);

    setPosts(postRes?.data?.posts?.rows || []);
    setLoading(false);
  };

  return (
    <>
      <main className="bg-gray-100 h-auto bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <div className="px-px md:px-3">
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
          text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>posts</li>
            </ul>
            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
              uppercase tracking-widest font-semibold text-xs text-gray-600
              border-t"
            >
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs" />
                  <span className="hidden md:inline">posts</span>
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap -mx-px md:-mx-3">
              {loading ? (
                <Loader size="small" />
              ) : (
                posts?.map(({ post_url, id }) => (
                  <NavLink
                    to={`/post?postId=${id}`}
                    className="w-1/3 flex md:my-2 p-px md:px-2"
                    key={id}
                  >
                    <img
                      className="w-[220px] h-[200px] flex-1 object-cover"
                      src={post_url}
                      alt="post"
                    />
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OurPosts;
