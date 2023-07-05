import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import NavDrawer from "../components/navbar/NavDrawer";
import LogoutCallback from "./auth/loginLogout/LogoutCallback";
import UserRoutes from "./users/UserRoutes";

type Props = {
  title: string;
};

const LoggedInMain = ({ title }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        readOnly={true}
      />
      <div className="drawer-content flex flex-col h-screen">
        <Navbar title={title} openDrawer={() => setDrawerOpen(true)} />
        <div className="max-w-screen-md pb-24 sm:pb-6 w-full mx-auto my-auto flex-1 overflow-y-auto scrollbar-hide px-2 pt-2">
          <Routes>
            <Route path="/users/*" element={<UserRoutes />} />
            <Route path="/logout" element={<LogoutCallback />} />
          </Routes>
        </div>
      </div>
      <NavDrawer closeDrawer={() => setDrawerOpen(false)} />
    </div>
  );
};

export default LoggedInMain;
