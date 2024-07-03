import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const playerName = useSelector((state) => state.roomInfo.playerName);
  const playerId = useSelector((state) => state.roomInfo.playerId);
  const turn = useSelector((state) => state.roomInfo.turn);
  const turnRunning = useSelector((state) => state.roomInfo.turnRunning);
  const guessedWord = useSelector((state) => state.roomInfo.guessedWord);

  const StompConnection  = useSelector(state=>state.StompConnection.connection)

  const sendMessage = () => {
    if(message.trim().length==0){
      toast.warn("Message can't be empty.")
      return ;
    }
    StompConnection.send(
      `/app/message/${roomId}`,
      {},
      JSON.stringify({
        body: message.trim(),
        senderName: playerName,
        turnRunning: turnRunning,
        senderId: playerId
      })
    );
    setMessage('')
  };

  return (
    <div className=" bg-frontBlue h-[8%] w-full flex justify-center items-center sticky bottom-0">
      <input
        type="text"
        className=" disabled:cursor-not-allowed rounded-sm p-2 flex-grow m-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={turn===playerId || guessedWord}
      />
      <button
        className=" disabled:cursor-not-allowed active:hover:bg-[#fad8de] shadow-sm shadow-black rounded-sm py-2 m-2 px-3 hover:bg-[#fcb1be] transition-colors bg-pink font-semibold text-white"
        onClick={sendMessage}
        disabled={turn===playerId || guessedWord}
      >
        Send
      </button>
      <span className="text-gray-800 text-sm mr-2">#{roomId}</span>
    </div>
  );
};

export default ChatInput;
