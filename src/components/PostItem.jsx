import { Button, Modal, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import PostForm from "./forms/PostForm";
import postService from "@services/post";
import toast from "react-hot-toast";
import socket from "@helpers/socket";
import CommentSection from "./CommentSection";
import { constants } from "@utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { timeFormatter } from "@utils/timeUtils";
import ConfirmationModal from "@components/models/ConfirmationModal";
import ContentCard from "@components/ContentCard";

const PostItem = ({ post: rawPost, user }) => {
  const navigate = useNavigate();
  console.log("🚀 ~ file: PostItem.jsx:15 ~ PostItem ~ user:", user, rawPost);
  const isOurPost = rawPost?.user?.id === user?.id;
  const [post, setPost] = useState(rawPost);
  const [showModal, setShowModal] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.some((_like) => _like?.likes?.id === user?.id)
  );

  useEffect(() => {
    socket.on(`like-${post.id}`, (likeData) => {
      const { liked, like, likedUser = {} } = likeData;
      const likedPost = { ...like, likes: likedUser };
      setPost((post) => ({
        ...post,
        likes: liked
          ? [...post.likes, likedPost]
          : post.likes.filter((_like) => _like?.id !== like?.id),
      }));
      if (likedUser.id === user.id) {
        setIsLiked(liked);
      }
    });

    return () => {
      socket.off(`like-${post.id}`);
    };
  }, []);

  const createPostTime = useMemo(() => {
    const formattedTime = timeFormatter(post?.createdAt, "d MMMM");
    return (
      <span className="text-xs text-gray-500 opacity-90 text-start">
        {formattedTime}
      </span>
    );
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCommentOpen = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const handlePostDelete = async () => {
    const deleteRes = await postService.delete(post.id);
    console.log(
      "🚀 ~ file: PostItem.jsx:16 ~ handlePostDelete ~ deleteRes:",
      deleteRes
    );
    if (deleteRes?.success) {
      toast.success("Post deleted successfully!");
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const topLikes = post?.likes?.slice(0, 3) || [];

  const handleLike = () => socket.emit(`like-${post.id}-${user.id}`);
  return (
    <div className="container mx-auto px-20">
      <div className="p-3 px-6 min-h-48 flex justify-center items-center cursor-auto">
        <div className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
          <div className="flex items-center justify-between p-3">
            <div
              className={`flex items-center space-x-2 ${
                isOurPost ? "cursor-auto" : "cursor-pointer"
              }`}
              onClick={
                isOurPost
                  ? () => {}
                  : () => navigate(`/?friend_id=${post?.user?.id}`)
              }
            >
              <img
                src={constants.getAvatar(post?.user?.profile_url)}
                alt="profile"
                className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
              />
              <ContentCard
                title={post?.user?.username || "N/A"}
                subContent={post?.location || "N/A"}
              />
            </div>

            {isOurPost ? (
              <div>
                <Button
                  icon={<EditOutlined />}
                  title="Edit post"
                  onClick={handleEditClick}
                />
                <ConfirmationModal
                  title="Delete the post"
                  description="Are you sure to delete this post?"
                  onConfirm={handlePostDelete}
                />
              </div>
            ) : null}
          </div>
          <img
            src={post?.post_url || "https://stackdiary.com/140x100.png"}
            alt=""
            className="object-cover object-center w-full h-72 bg-coolGray-500"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                  title="Like"
                  onClick={handleLike}
                  danger
                />
                <Button
                  icon={<MessageOutlined />}
                  title="Comment"
                  onClick={handleCommentOpen}
                />
              </div>
            </div>
            <ContentCard
              title={post?.title || "N/A"}
              subContent={post?.content || "N/A"}
              titleClass="text-md"
              subClass="!text-sm !leading-none first-letter:0.0"
            />

            <div className="flex flex-wrap items-center pt-3 pb-1">
              <div className="flex gap-2 space-x-2">
                <div className="flex  -space-x-1">
                  {topLikes?.map((like) => (
                    <img
                      key={like?.id}
                      alt={like?.id}
                      className="w-5 h-5 border rounded-full bg-coolGray-500 border-coolGray-800"
                      src={constants.getAvatar(like?.likes?.profile_url)}
                    />
                  ))}
                </div>
                <div className="text-sm text-start flex items-center ">
                  Liked by&nbsp;
                  {topLikes.map((_like) => _like?.likes?.username).join(", ")}
                  {post?.likes?.length > 3
                    ? ` and ${post?.likes.length - 3} others`
                    : null}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm flex items-center">
                {!isCommentOpen ? (
                  <span className="flex flex-col">
                    <span
                      className="text-sm text-gray-500 cursor-pointer"
                      onClick={handleCommentOpen}
                    >
                      View all {post?.comments?.length} comments
                    </span>
                    {createPostTime}
                  </span>
                ) : null}
              </p>
              {isCommentOpen ? (
                <CommentSection
                  comments={rawPost?.comments}
                  postId={post.id}
                  user={user}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <Modal
          title="Edit Post"
          open={showModal}
          onCancel={handleCancel}
          footer={null}
        >
          <PostForm onCancel={handleCancel} post={post} />
        </Modal>
      ) : null}
    </div>
  );
};

export default PostItem;
