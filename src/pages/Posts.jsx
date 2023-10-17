import Loader from "@components/Loader";
import PostItem from "@components/PostItem";
import postService from "@services/post";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Posts = () => {
  const user = useSelector((state) => state?.authData?.user);
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  console.log("🚀 ~ file: Posts.jsx:13 ~ Posts ~ posts:", posts);

  useEffect(() => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    getPosts().catch(console.error);
  }, []);

  const getPosts = async () => {
    setLoading(true);
    const postRes = await postService.getAll(true);
    setPosts(postRes?.data?.posts?.rows || []);
    setLoading(false);
  };

  return loading ? (
    <Loader className="h-[calc(100vh-4rem)]" />
  ) : (
    <div>
      {posts?.map((post) => (
        <PostItem key={post?.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Posts;
