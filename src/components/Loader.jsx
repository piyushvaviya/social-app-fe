import { Spin } from "antd";
import React from "react";

const Loader = ({ tip = "Loading...", size = "large", className = "" }) => {
  return (
    <div className="flex justify-center w-full">
      <Spin tip={tip} size={size} className="w-full h-full m-auto">
        <div className={`p-[50px] rounded w-full ${className}`} />
      </Spin>
    </div>
  );
};

export default Loader;
