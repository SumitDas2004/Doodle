import React, { useEffect, memo } from "react";
import PlayerListItem from "./PlayerListItem";
import { useSelector, useDispatch } from "react-redux";
import { client } from "stompjs";
import {
  addPlayer,
  removePlayer,
  setOwner,
} from "../../../reduxStore/roomInfo";
import { changeDetails } from "../../../reduxStore/scorePage";

const PlayerList = () => {
  const players = useSelector((state) => state.roomInfo.players);
  const roomId = useSelector((state) => state.roomInfo.roomId);
  const playerId = useSelector((state) => state.roomInfo.playerId);
  const turn = useSelector((state) => state.roomInfo.turn);

  const dispatch = useDispatch();

  const subscribe = () => {
    const con = client(`${import.meta.env.WEB_SERVICE_URL}/ws`);
    con.debug = () => {};
    con.connect({}, () => {
      con.subscribe(`/topic/newplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatch(addPlayer(player));
      });
      con.subscribe(`/topic/removeplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatch(removePlayer(player));
        dispatch(setOwner(player.newOwner));
      });
      con.subscribe(`/topic/endturn/${roomId}`, (data) => {
        data = JSON.parse(data.body);
        const newPlayers = data.players;
        dispatch(
          changeDetails({
            players: newPlayers,
            word: data.word,
          })
        );
      });
    });
  };

  

  useEffect(() => {
    subscribe();
  }, []);

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
