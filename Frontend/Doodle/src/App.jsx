import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import PlayingZone from "./PlayingZone/PlayingZone";
import LandingPage from "./landingPage/LandingPage";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const playerId = useSelector((state) => state.roomInfo.playerId);
  const roomId = useSelector((state) => state.roomInfo.roomId);


  const cleanUpFun = useCallback(() => {
    fetch(
      `http://localhost:8080/room/leave?player=${playerId}&room=${roomId}`,
      {
        method: "DELETE",
        keepalive: true,
      }
    );
  }, [playerId, roomId]);

  useEffect(() => {
    window.addEventListener("beforeunload", cleanUpFun);
    return () => window.removeEventListener("beforeunload", cleanUpFun);
  }, [playerId, roomId]);

  const isPlaying = useSelector((state) => state.roomInfo.isPlaying);
  return (
    <div className="h-screen">
      {!isPlaying ? (
        <LandingPage />
      ) : (
        <>
          <Header />
          <PlayingZone />
        </>
      )}
      <ToastContainer newestOnTop={true} theme="colored" />
    </div>
  );
}

export default App;