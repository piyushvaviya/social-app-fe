import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "@components/Profile";
import { Modal } from "antd";
import PostForm from "@components/forms/PostForm";
import OurPosts from "@components/OurPosts";
import { getParams } from "@utils/urlUtils";
import authService from "@services/auth";
import { messages } from "@utils/messages";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import _socket from "@helpers/socket";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.authData?.user);
  const [shouldShowPostModal, setShouldShowPostModal] = useState(false);
  const [friendData, setFriendData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const friendId = getParams("friend_id");

  useEffect(() => {
    _socket.emit("new-user-add", user.id);
    _socket.on("get-users", (users) => {
      const isActive = !!users[friendId || user.id];
      console.log("🚀 ~ file: Home.jsx:30 ~ _socket.on ~ users:", users);
      setIsOnline(isActive);
    });
    window.scrollTo(0, 0);
  }, [user]);

  const showPostModal = () => {
    setShouldShowPostModal(true);
  };

  const hidePostModal = () => {
    setShouldShowPostModal(false);
  };

  const getFriendData = async () => {
    const friendRes = await authService.getFriendById(friendId);

    if (friendRes?.success) {
      setFriendData(friendRes?.data);

      return;
    }

    const errorMsg = messages.resError(friendRes?.message);
    toast.error(errorMsg);
    navigate("/");
  };

  useEffect(() => {
    if (friendId) {
      getFriendData();

      return;
    }
    setFriendData(null);
  }, [friendId]);

  return (
    <div>
      <Profile
        user={friendData || user}
        onPlusClick={showPostModal}
        friendId={friendId}
        isOnline={isOnline}
      />
      <OurPosts user={friendData || user} />
      <Modal
        open={shouldShowPostModal}
        onCancel={hidePostModal}
        title="Create Post"
        centered
        footer={null}
      >
        <PostForm onCancel={hidePostModal} isCreating={true} />
      </Modal>
    </div>
  );
};

export default Home;
