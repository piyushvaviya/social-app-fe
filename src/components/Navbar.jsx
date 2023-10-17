// import MenuIcon from "@/assets/icons/MenuIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import { menuItems } from "@utils/dropdowns";
import { Button, Dropdown, Menu } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/authDataSlice";
import _socket from "@helpers/socket";
import { constants } from "@utils/constants";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userData = useSelector((state) => state?.authData?.user);
  const dispatch = useDispatch();

  const menu = useMemo(
    () => (
      <Menu>
        {[
          {
            key: "userData",
            link: "/",
            element: (
              <div
                className="text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900  dark:text-white">
                    {userData?.username}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {userData?.email}
                  </span>
                </div>
              </div>
            ),
          },
          {
            key: "logout",
            label: "Logout",
            onClick: () => {
              dispatch(logout());
              _socket.emit("offline");
            },
          },
        ].map((item) => (
          <MenuItem {...item} />
        ))}
      </Menu>
    ),
    [userData]
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const navigationMenus = useMemo(() => {
    return menuItems.map((item) => (
      <li key={item.key}>
        <NavLink
          to={item.link}
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `block py-2 pl-3 pr-4 ${
              isActive
                ? "text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                : "text-white rounded hover:bg-blue-500 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            } rounded`
          }
        >
          {item.label}
        </NavLink>
      </li>
    ));
  }, []);

  return (
    <nav className="flex-1 bg-gray-900 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Social App
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Button>
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={constants.getAvatar(userData?.profile_url)}
                alt="user photo"
              />
            </Button>
          </Dropdown>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
        </div>

        <div
          className={`items-center justify-between ${
            isMobileMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-1 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navigationMenus}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
