import React, { memo } from "react";
import Canvas from "./Canvas";
import ChatInput from "./ChatInput";
import ChatSection from "./ChatSection/ChatSection";

const PlayingZone = () => {

  return (
    <section className="h-[95vh] w-full bg-backBlue flex flex-col items-center overflow-x-hidden">
      <div className="h-[95vh] w-full max-w-[800px]">
        <Canvas />
        <ChatSection />
        <ChatInput />
      </div>
    </section>
  );
};

export default memo(PlayingZone)
