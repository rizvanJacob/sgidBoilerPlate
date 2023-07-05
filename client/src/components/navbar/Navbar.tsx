import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import { MenuItem } from "../../@types/@types.navbar";
import { MENU_ITEMS } from "./navbarUtilities";
import HamburgerIcon from "../../assets/HamburgerIcon";

type props = {
  title: string;
  openDrawer: () => void;
};

const Navbar = ({ title, openDrawer }: props): JSX.Element => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(MENU_ITEMS);
  }, []);

  return (
    <div className="w-full navbar bg-primary">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          className="btn btn-square btn-ghost text-secondary"
          onClick={openDrawer}
        >
          <HamburgerIcon />
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 text-secondary font-bold text-xl">
        {title}
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {menuItems.map((item, index) => (
            <NavLink key={index} display={item.name} to={item.path} />
          ))}
          <UserMenu />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
