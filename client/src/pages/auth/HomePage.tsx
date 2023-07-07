import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { buildFullUrl } from "../../utilities/fetchUtilities";


const HomePage = (): JSX.Element => {

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const state = searchParams.get("state") as string;
  const navigate = useNavigate();

  useEffect(() => {
    if (state === "login") {
      navigate("/loginCallback", { state: { code } });
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch(buildFullUrl("/api"));
    const data = await response.json();
    const { loginUrl, sessionId } = data;

    localStorage.setItem("sessionId", sessionId);
    window.location.replace(loginUrl);
  };

  return (
    <div className="flex flex-col mx-auto items-center justify-evenly gap-4 h-screen">
      <button onClick={handleLogin}>LOGIN</button>
    </div>
  );
};

export default HomePage;
