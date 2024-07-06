import React, { memo } from "react";
import PlayerListItem from "./PlayerListItem";
import { useSelector } from "react-redux";

const PlayerList = () => {
  const players = useSelector((state) => state.roomInfo.players);
   const playerId = useSelector((state) => state.roomInfo.playerId);
  const turn = useSelector((state) => state.roomInfo.turn);


  return (
    <section className="h-full w-1/2 overflow-y-scroll pl-1 scroll-smooth bg-[#0000001b]">
      {players.map((player) => (
        <PlayerListItem
          key={player.id}
          name={player.name}
          score={player.score}
          avatar={player.avatar}
          isUser={player.id === playerId}
          isTurn={turn === player.id}
        />
      ))}
    </section>
  );
};

export default memo(PlayerList);
