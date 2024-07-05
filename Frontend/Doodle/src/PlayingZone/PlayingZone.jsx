import React, { memo, useEffect, useMemo } from "react";
import Canvas from "./Canvas";
import ChatInput from "./ChatInput";
import ChatSection from "./ChatSection/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { client } from "stompjs";
import { startGame } from "../reduxStore/roomInfo";

const PlayingZone = () => {
  const playerId = useSelector((state) => state.roomInfo.playerId);
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const dispatch = useDispatch();

  const StompConnection = useMemo(() => {
    const con = new client(`${import.meta.env.WEB_SERVICE_URL}/ws`);
    con.debug = () => {};
    return con
  }, []);

  useEffect(() => {

    const stompClient = new client(`${import.meta.env.WEB_SERVICE_URL}/ws`);
    stompClient.debug = () => {};
    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/roominfo/${roomId}`, (roomInfo) => {
        roomInfo = JSON.parse(roomInfo.body);
        dispatch(startGame(roomInfo));
      });
    });

    return () => {
      axios({
        url: `${import.meta.env.WEB_SERVICE_URL}/room/?playerId=${playerId}&roomId=${roomId}`,
        method: "DELETE",
      });
      StompConnection.send(
        `/app/removeplayer/${roomId}`,
        JSON.stringify({ playerId: playerId })
      );
    };
  }, []);

  return (
    <section className="h-[95vh] w-full bg-backBlue flex flex-col items-center">
      <div className="h-[95vh] w-full max-w-[800px]">
        <Canvas />
        <ChatSection />
        <ChatInput />
      </div>
    </section>
  );
};

export default memo(PlayingZone)
