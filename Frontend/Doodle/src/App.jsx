import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import PlayingZone from "./PlayingZone/PlayingZone";
import LandingPage from "./landingPage/LandingPage";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const playerId = useSelector((state) => state.roomInfo.playerId);
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const StompConnection = useSelector(
    (state) => state.StompConnection.connection
  );

  const cleanUpFun = useCallback(() => {
    fetch(
      `http://localhost:8080/room/leave?player=${playerId}&room=${roomId}`,
      {
        method: "DELETE",
        keepalive: true,
      }
    );
    StompConnection.disconnect(() => {
      console.log("bye!");
    });
  }, [playerId, roomId]);

  useEffect(() => {
    window.addEventListener("unload", cleanUpFun);
    return () => window.removeEventListener("unload", cleanUpFun);
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
