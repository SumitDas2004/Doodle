import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const turnEndsAt = useSelector((state) => state.roomInfo.turnEndsAt);
  const wordLen = useSelector((state) => state.roomInfo.wordLen);
  const word = useSelector(state=>state.roomInfo.word)

  const [timeLeft, setTimeLeft] = new useState(60);
  useEffect(() => {
    if (wordLen && wordLen > 0 && timeLeft >= 0)
      setTimeout(() => {
        const newTime = (turnEndsAt - Date.now()) / 1000;
        setTimeLeft(Math.round(newTime));
      }, 1000);
  }, [timeLeft, wordLen]); //change in wordlen means new turn has started, so the counter needs to start!

  return (
    <div className="w-full h-[5%] bg-whihte sticky grid-cols-3 top-0 bg-frontBlue text-white font-semibold grid items-center justify-center">
      <span className=" text-center m-auto">Doodle</span>
      {!wordLen ? (
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
      <span className=" text-center m-auto phone:text-xs tablet:text-base">
        {timeLeft}s
      </span>
    </div>
  );
};

export default memo(Header);
