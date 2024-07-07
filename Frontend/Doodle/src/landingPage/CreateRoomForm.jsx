import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeRoomInfo } from "../reduxStore/roomInfo";
import { setIsJoiningRoom } from "../reduxStore/isJoiningRoomReducer";
import AvatarStore from "./AvatarStore";
import { toast } from "react-toastify";

const CreateRoomForm = ({ formState }) => {
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [playerAvatar, setPlayerAvatar] = useState("");
  const dispatch = useDispatch();

  const createRoom = useCallback(() => {
    if(playerNameInput.trim().length===0){
      toast.error('Player Name can\'t be empty');
      return ;
    }
    if(playerNameInput.trim().length>12){
      toast.error('Player Name can be maximum 12 characters long.');
      return ;
    }
    dispatch(setIsJoiningRoom(true));
    axios({
      url: `${import.meta.env.VITE_WEB_SERVICE_URL}/room/`,
      method: "POST",
      data: { playerName: playerNameInput.trim(), playerAvatar: playerAvatar },
    })
      .then(({ data }) => {
        if (data.status === 1) {
          data = data.data;
          dispatch(
            changeRoomInfo({
              ...data,
              isPlaying: true
            })
          );
        }else{
          toast.error(data.error)
        }
        dispatch(setIsJoiningRoom(false));
      })
      .catch(({response}) => {
        const {data} = response
        toast.error(data.error)
        dispatch(setIsJoiningRoom(false));
      }).catch(()=>{
        toast.error('Somethng went wrong.')
        dispatch(setIsJoiningRoom(false));
      });
  }, [playerNameInput, playerAvatar])

  return (
    <div className="h-full w-1/2 overflow-hidden flex justify-center items-center">
      <div
        style={{ transition: "all 400ms" }}
        className={`w-[200%] h-[90%] relative ${
          formState !== "create" ? "left-0" : "left-[100%]"
        }`}
      >
        <div className="w-full h-full rounded-sm bg-white relative z-20 shadow-xl shadow-[#00000026] flex flex-col justify-center items-center overflow-hidden">
          <AvatarStore
            className={`${formState !== "create" ? "left-0" : "left-[100%]"}`}
            setPlayerAvatar={setPlayerAvatar}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="text"
            className={`w-[85%] mb-6 px-3 py-2 border-2 text-md border-gray-400 relative text-sm rounded-sm ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            placeholder="Enter your name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <input
            style={{ transition: "all 500ms" }}
            type="button"
            value="Create Room"
            className={`active:bg-[#fad8de] duration-150 hover:bg-[#fcb1be] transition-colors bg-pink px-3 py-2 w-min cursor-pointer text-white text-lg rounded-sm relative ${
              formState !== "create" ? "left-0" : "left-[100%]"
            }`}
            onClick={createRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CreateRoomForm);
