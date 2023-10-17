import Loader from "@components/Loader";
import PostItem from "@components/PostItem";
import postService from "@services/post";
import { messages } from "@utils/messages";
import { getParams } from "@utils/urlUtils";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.authData?.user);
  const postId = getParams("postId");
  const [loading, setLoading] = React.useState(true);
  const [postData, setPostData] = React.useState({});
  console.log("🚀 ~ file: Post.jsx:8 ~ Post ~ postId:", typeof postId);

  useEffect(() => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    const postRes = await postService.getPostById(postId);
    console.log("🚀 ~ file: Post.jsx:27 ~ getPosts ~ postRes:", postRes);

    if (postRes?.success) {
      setPostData(postRes?.data || {});
      setLoading(false);

      return;
    }

    const errorMsg = messages.resError(postRes?.message);
    toast.error(errorMsg);
    navigate("/");

    setLoading(false);
  };

  return (
    <div>{loading ? <Loader /> : <PostItem post={postData} user={user} />}</div>
  );
};

export default Post;
