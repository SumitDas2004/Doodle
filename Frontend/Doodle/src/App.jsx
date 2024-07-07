import { useSelector } from "react-redux";
import Header from "./PlayingZone/Header";
import PlayingZone from "./PlayingZone/PlayingZone";
import LandingPage from "./landingPage/LandingPage";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import LoadinPage from "./LoadinPage";

function App() {

  const [isReady, setIsReady] = useState(false)
  const playerId = useSelector((state) => state.roomInfo.playerId);
  const roomId = useSelector((state) => state.roomInfo.roomId);


  const cleanUpFun = useCallback(() => {
    fetch(
      `${import.meta.env.VITE_WEB_SERVICE_URL}/room/leave?player=${playerId}&room=${roomId}`,
      {
        method: "DELETE",
        keepalive: true,
      }
    );
  }, [playerId, roomId]);

  useEffect(()=>{
    fetch(
      `${import.meta.env.VITE_WEB_SERVICE_URL}/room/ping`,
    ).then(()=>setIsReady(true))
    .catch(()=>toast.error("Something went wrong. Please reload"))
  }, [])

  useEffect(() => {
    window.addEventListener("beforeunload", cleanUpFun);
    return () => window.removeEventListener("beforeunload", cleanUpFun);
  }, [playerId, roomId]);

  const isPlaying = useSelector((state) => state.roomInfo.isPlaying);
  return (
    <>{isReady ? <div className="h-screen">
      {!isPlaying ? (
        <LandingPage />
      ) : (
        <>
          <Header />
          <PlayingZone />
        </>
      )}
      <ToastContainer newestOnTop={true} theme="colored" />
    </div>:<LoadinPage/>}</>
    
  );
}

export default App;
