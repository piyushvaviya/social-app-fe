import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import socket from "@helpers/socket";
import postService from "@services/post";
import { constants } from "@utils/constants";
import { messages } from "@utils/messages";
import { timeAgoFormat } from "@utils/timeUtils";
import { Button, Form, Input, Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const antIcon = <LoadingOutlined className="text-white" spin />;

const CommentSection = ({ comments = [], postId, user }) => {
  console.log(
    "🚀 ~ file: CommentSection.jsx:9 ~ CommentSection ~ comments:",
    comments
  );
  const [commentValue, setCommentValue] = useState("");
  const [userComments, setUserComments] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);
  const commentRef = useRef(null);
  const commentSectionRef = useRef();

  useEffect(() => {
    // Scroll to the last added item
    commentSectionRef.current.scrollTo(
      0,
      commentSectionRef.current.scrollHeight
    );
    // commentRef.current.input.value = "";
  }, [userComments]);

  useEffect(() => {
    socket.on(`comment-${postId}`, (commentInfo) => {
      const {
        comment: { content, id, createdAt },
        commentedUser,
      } = commentInfo;

      const commentData = {
        id,
        content,
        createdAt,
        user: {
          ...commentedUser,
        },
      };

      setUserComments([...comments, commentData]);
      setIsLoading(false);
    });

    return () => {
      socket.off(`comment-${postId}`);
    };
  }, []);

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSend = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // const content = commentValue;

    if (!commentValue.trim()) {
      toast.error("Comment cannot be empty!");

      return;
    }
    console.log("first");
    socket.emit(`comment-${postId}-${user?.id}`, { commentValue });
    console.log("second");

    setCommentValue("");

    // const newCommentRes = await postService.addComment(postId, { content });

    // if (newCommentRes?.success) {
    //   const { content, id, createdAt } = newCommentRes?.data || {};
    //   const commentData = {
    //     id,
    //     content,
    //     createdAt,
    //     user: {
    //       id: user?.id,
    //       username: user?.username,
    //       profile_url: constants.getAvatar(user?.profile_url),
    //     },
    //   };

    //   setUserComments([...comments, commentData]);
    //   setIsLoading(false);
    //   return;
    // }
    // setIsLoading(false);
    // const errorMsg = messages.resError(res?.message);

    // toast.error(errorMsg);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-md font-semibold leading-none text-start">
        {userComments.length} comments
      </h2>
      <div
        ref={commentSectionRef}
        className="flex flex-col gap-2 max-h-20 overflow-y-auto scrollbar"
        id="comment-section"
      >
        {userComments?.map((comment) => (
          <div className="flex items-center space-x-2" key={comment.id}>
            <img
              src={constants.getAvatar(user?.profile_url)}
              alt=""
              className="object-cover mb-auto
               w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold leading-none text-start">
                {comment?.user?.username || "N/A"}
              </h2>
              <div className="flex flex-col gap-1">
                <span className="text-xs leading-none text-coolGray-400 text-start">
                  {comment.content || "N/A"}
                </span>
                <span className="text-xs opacity-60 leading-none text-coolGray-400 text-start">
                  {timeAgoFormat(comment.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            name="comment"
            type="text"
            placeholder="Add a comment..."
            className="w-full py-0.5 px-0.5 bg-transparent border border-opacity-50 rounded text-sm pl-0 text-coolGray-100"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            value={commentValue}
            onChange={handleChange}
            ref={commentRef}
          />

          <Button
            type="primary"
            htmlType="submit"
            className={` bg-blue-500 flex items-center ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed hover:!bg-gray-500"
                : "bg-blue-500"
            }`}
            onClick={handleSend}
          >
            {isLoading ? <Spin indicator={antIcon} /> : <SendOutlined />}
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default CommentSection;
