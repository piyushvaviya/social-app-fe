import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ link, label, element, onClick }) => {
  const handleOnClick = onClick
    ? async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await onClick();
      }
    : () => {};
  return (
    <Menu.Item>
      {element || (
        <NavLink
          to={link}
          onClick={handleOnClick}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {label}
        </NavLink>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
