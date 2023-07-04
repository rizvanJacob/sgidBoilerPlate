import { Route, Routes } from "react-router-dom";
import { setCurrentUserProp } from "../../@types/@types.user";
import HomePage from "./HomePage";
import LoginCallbackPage from "./loginLogout/LoginCallbackPage";
import SignUpPage from "./signup/SignUpPage";

const AuthRoutes = ({ setCurrentUser }: setCurrentUserProp): JSX.Element => {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route
        path="/loginCallback"
        element={<LoginCallbackPage setCurrentUser={setCurrentUser} />}
      />
      <Route path="/new" element={<SignUpPage />} />
    </Routes>
  );
};

export default AuthRoutes;
