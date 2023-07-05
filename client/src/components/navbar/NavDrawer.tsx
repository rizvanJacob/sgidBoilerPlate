import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import { MENU_ITEMS } from "./navbarUtilities";
import { MenuItem } from "../../@types/@types.navbar";
import CloseIcon from "../../assets/CloseIcon";

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
        <CloseIcon />
        {menuItems.map((item, index) => (
          <NavLink key={index} display={item.name} to={item.path} />
        ))}
        <UserMenu />
      </ul>
    </div>
  );
};

export default NavDrawer;
