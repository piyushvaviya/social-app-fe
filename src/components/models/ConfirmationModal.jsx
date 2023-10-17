import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";

const ConfirmationModal = ({ title, description, onConfirm }) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      okText="Yes"
      okButtonProps={{ className: "bg-blue-500" }}
      cancelText="No"
    >
      <Button icon={<DeleteOutlined />} title="Delete" danger />
    </Popconfirm>
  );
};

export default ConfirmationModal;
