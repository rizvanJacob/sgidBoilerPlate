import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import { MENU_ITEMS } from "./navbarUtilities";
import { MenuItem } from "../../@types/@types.navbar";

type props = {
  closeDrawer: () => void;
};
const NavDrawer = ({ closeDrawer }: props) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(MENU_ITEMS);
  }, []);
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-secondary gap-1" onClick={closeDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary self-end"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
            transform="rotate(45, 12, 12)"
          />
        </svg>

        {menuItems.map((item, index) => (
          <NavLink key={index} display={item.name} to={item.path} />
        ))}
        <UserMenu />
      </ul>
    </div>
  );
};

export default NavDrawer;
