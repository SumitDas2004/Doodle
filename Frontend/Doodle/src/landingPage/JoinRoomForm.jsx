import axios from "axios";
import React, { memo, useCallback, useState, useMemo } from "react";
import { setIsJoiningRoom } from "../reduxStore/isJoiningRoomReducer";
import { useDispatch } from "react-redux";
import { changeRoomInfo } from "../reduxStore/roomInfo";
import AvatarStore from "./AvatarStore";
import { toast } from "react-toastify";
import { client } from "stompjs";

const JoinRoomForm = ({ formState }) => {
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");

  const [roomIdInput, setRoomIdInput] = useState("");
  const dispatch = useDispatch();

  const StompConnection = useMemo(() => {
    const con = client(`${import.meta.env.VITE_WEB_SERVICE_URL}/ws`);
    con.debug = () => {};
    return con
  }, []);

  const sendPlayerInfo = (player, roomId) => {
    StompConnection.send(`/app/newplayer/${roomId}`, {}, JSON.stringify(player));
  };

  const joinRoom = useCallback(() => {
    if (playerNameInput.trim().length === 0) {
      toast.error("Player Name can't be empty");
      return;
    }
    if (roomIdInput.trim().length === 0) {
      toast.error("Room Id can't be empty");
      return;
    }
    dispatch(setIsJoiningRoom(true));
    axios({
      url: `${import.meta.env.VITE_WEB_SERVICE_URL}/room/join`,
      method: "POST",
      data: {
        playerName: playerNameInput.trim(),
        roomId: roomIdInput.trim(),
        playerAvatar: playerAvatar,
      },
    })
      .then(({ data }) => {
        if (data.status === 1) {
          data = data.data;
          dispatch(
            changeRoomInfo({
              ...data,
              isPlaying: true,
            })
          );
          sendPlayerInfo(
            {
              name: data.playerName,
              id: data.playerId,
              score: 0,
              avatar: playerAvatar,
            },
            data.roomId
          );
        } else {
          toast.error(data.error);
        }
        dispatch(setIsJoiningRoom(false));
      })
      .catch(({ response }) => {
        const { data } = response;
        toast.error(data.error);
        dispatch(setIsJoiningRoom(false));
      });
  }, [playerNameInput, playerAvatar, roomIdInput]);


  return (
    <div className="h-full w-1/2 overflow-hidden flex justify-center items-center">
      <div
        style={{ transition: "all 400ms" }}
        className={`w-[200%] h-[90%] relative ${
          formState === "create" ? "left-0" : "-left-[100%]"
        }`}
      >
        <div className="w-full h-full rounded-sm bg-white relative z-20 shadow-xl shadow-[#00000026] flex flex-col justify-center items-center overflow-hidden">
          <AvatarStore
            className={`${formState === "create" ? "left-0" : "-left-[100%]"}`}
            setPlayerAvatar={setPlayerAvatar}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            name=""
            id=""
            className={`w-[85%] mb-6 px-3 py-2 border-2 text-sm border-gray-400 relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            placeholder="Enter your name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            name=""
            id=""
            className={`w-[85%] mb-6 px-3 py-2 border-2 text-sm border-gray-400 relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            placeholder="Enter Room Id"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="button"
            value="Join Room"
            className={`active:bg-[#fad8de] hover:bg-[#fcb1be] duration-150 transition-colors bg-pink px-3 py-2 w-min cursor-pointer text-white text-lg relative rounded-sm ${
              formState === "create" ? "left-0" : "-left-[100%]"
            }`}
            onClick={joinRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(JoinRoomForm);
