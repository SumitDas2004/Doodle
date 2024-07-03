import React from "react";

const ChatItem = ({ sender, body, isRightGuess }) => {
  return (
    <div
      className={`${
        isRightGuess ? "bg-green-300" : "bg-white"
      } w-full px-2 py-1 text-xs rounded-sm flex border-b border-backBlue flex-wrap`}
    >
      {!isRightGuess ? (
        <>
          <span className="mr-1">{sender + ":"}</span>
          <span className="block break-words max-w-[96%]">{body}</span>
        </>
      ) : (
        <span className=" text-green-900">{`${sender} guessed it right!`}</span>
      )}
    </div>
  );
};

export default ChatItem;
