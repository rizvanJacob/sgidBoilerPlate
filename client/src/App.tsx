import { useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { CurrentUser, UserPayload } from "./@types/@types.user";
import { createLogoutTimer } from "./utilities/accountUtilities";
import LoggedInMain from "./pages/LoggedInMain";
import AuthRoutes from "./pages/auth/AuthRoutes";
import "./App.css";

const AUTHORISE = import.meta.env.VITE_AUTHORISE === "true";
const DEFAULT_USER = {
  id: 1,
  accountType: 1,
};

console.log(AUTHORISE);
export const CurrentUserContext = createContext<CurrentUser | null>(null);
export const TitleContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!AUTHORISE) {
      setCurrentUser(DEFAULT_USER);
    }
    let clearLogoutTimer: (() => void) | null = null;
    try {
      const token = localStorage.getItem("token") as string;
      const decoded = jwt_decode(token) as UserPayload;
      if (dayjs.unix(decoded.exp).isAfter(dayjs())) {
        setCurrentUser(decoded as CurrentUser);
        clearLogoutTimer = createLogoutTimer(decoded.exp, setCurrentUser);
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      console.log("cleaning up app");
      if (clearLogoutTimer) clearLogoutTimer();
    };
  }, []);

  return (
    <TitleContext.Provider value={setTitle}>
      <CurrentUserContext.Provider value={currentUser}>
        {currentUser ? (
          <LoggedInMain title={title} />
        ) : (
          <AuthRoutes setCurrentUser={setCurrentUser} />
        )}
      </CurrentUserContext.Provider>
    </TitleContext.Provider>
  );
}

export default App;
