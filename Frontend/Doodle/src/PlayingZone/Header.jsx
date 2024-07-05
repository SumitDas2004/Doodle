import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const owner = useSelector(state=>state.roomInfo.owner)
  const guessedWord = useSelector(state=>state.roomInfo.guessedWord)
  const playerId = useSelector(state=>state.roomInfo.playerId)
  const turnEndsAt = useSelector((state) => state.roomInfo.turnEndsAt);
  const wordLen = useSelector((state) => state.roomInfo.wordLen);
  const word = useSelector((state) => state.roomInfo.word);
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const curRound = useSelector((state) => state.roomInfo.curRound);
  const maxRounds = useSelector((state) => state.roomInfo.maxRounds);
  const turnRunning = useSelector((state) =>state.roomInfo.turnRunning)
  const [timeLeft, setTimeLeft] = new useState(60);

  const stopTurn = () => {
    fetch(`${import.meta.env.WEB_SERVICE_URL}/game/turn/end/` + roomId);
  };


  

  useEffect(()=>{
    setTimeLeft(Math.round((turnEndsAt-Date.now())/1000))
  }, [turnEndsAt])

  useEffect(() => {
    if (wordLen && wordLen > 0 && timeLeft >= 0) {
      if (timeLeft === 0 && owner===playerId) {
        stopTurn();
      }
      setTimeout(() => {
        const newTime = (turnEndsAt - Date.now()) / 1000;
        setTimeLeft(Math.round(newTime));
      }, 1000);
    }
  }, [timeLeft, wordLen]); //change in wordlen means new turn has started, so the counter needs to start. Hence when a round stops always change the wordlen to 0.

  return (
    <div className="w-full h-[5%] bg-whihte sticky grid-cols-3 top-0 bg-frontBlue text-white font-semibold grid items-center justify-center">
      {curRound>0 && <span className=" text-center m-auto">{`${curRound}/${maxRounds}`}</span>}
      {!wordLen || guessedWord ? (
        <span className=" text-center m-auto">Doodle</span>
      ) : (
        <>
          <span className=" text-center m-auto">
            {word ? (
              word
            ) : (
              <>
                {Array(wordLen).fill("_").join("")}
                <sub className="relative top-2 text-xs left-1">{wordLen}</sub>
              </>
            )}
          </span>
        </>
      )}
      {timeLeft>=0 && turnRunning && <span className=" text-center m-auto phone:text-xs tablet:text-base">
        {timeLeft}s
      </span>}
    </div>
  );
};

export default memo(Header);
