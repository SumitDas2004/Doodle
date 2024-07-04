import React, { useEffect, memo } from "react";
import PlayerListItem from "./PlayerListItem";
import { useSelector, useDispatch } from "react-redux";
import { client } from "stompjs";
import {
  addPlayer,
  removePlayer,
  setOwner,
  updatePlayerDetails,
  endTurn,
} from "../../../reduxStore/roomInfo";
import { changePlayers } from "../../../reduxStore/scorePage";

const PlayerList = () => {
  const players = useSelector((state) => state.roomInfo.players);
  const roomId = useSelector((state) => state.roomInfo.roomId);

  const dispatch = useDispatch();

  const subscribeToNewPlayer = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    con.connect({}, () => {
      con.subscribe(`/topic/newplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatch(addPlayer(player));
      });
    });
  };

  const subscribeToExitingPlayer = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    con.connect({}, () => {
      con.subscribe(`/topic/removeplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body);
        dispatch(removePlayer(player));
        dispatch(setOwner(player.newOwner));
      });
    });
  };

  const subscribeToTurnEnds = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    con.connect({}, () => {
      con.subscribe(`/topic/endturn/${roomId}`, (newPlayers) => {

        newPlayers = JSON.parse(newPlayers.body);
        dispatch(
          changePlayers(
            newPlayers
          )
        );
        
      });
    });
  };

  useEffect(() => {
    subscribeToNewPlayer();
    subscribeToExitingPlayer();
    subscribeToTurnEnds();
  }, []);

  return (
    <section className="h-full w-1/2 overflow-y-scroll pl-1 scroll-smooth bg-[#0000001b]">
      {players.map((player) => (
        <PlayerListItem
          key={player.id}
          name={player.name}
          score={player.score}
          avatar={player.avatar}
        />
      ))}
    </section>
  );
};

export default memo(PlayerList);
