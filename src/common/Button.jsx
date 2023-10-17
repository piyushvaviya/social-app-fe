import { Button } from "antd";
import PropTypes from "prop-types";

const CustomButton = ({
  type = "default",
  htmlType = "button",
  className = "",
  size = "middle",
  isDisabled = false,
  children,
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      className={`w-full ${className} ${
        isDisabled ? "!bg-gray-300 !text-gray-600 hover:!bg-gray-400 " : ""
      }`}
      size={size}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  htmlType: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  isDisabled: PropTypes.boolean,
  children: PropTypes.node.isRequired,
};

export default CustomButton;
