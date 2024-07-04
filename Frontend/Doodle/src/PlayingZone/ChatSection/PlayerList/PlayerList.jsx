import React, {useEffect, memo} from "react";
import PlayerListItem from "./PlayerListItem";
import { useSelector, useDispatch } from "react-redux";
import { client } from "stompjs";
import { addPlayer, removePlayer, setOwner } from "../../../reduxStore/roomInfo";

const PlayerList = () => {
  const players = useSelector((state) => state.roomInfo.players);
  const roomId = useSelector((state) => state.roomInfo.roomId);

  const dispatch = useDispatch()


  const subscribeToNewPlayer = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    let subscription;
    con.connect({}, () => {
      subscription = con.subscribe(`/topic/newplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body)
        dispatch(addPlayer(player))
      });
    });
    return subscription
  };

  const subscribeToExitingPlayer = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    let subscription;
    con.connect({}, () => {
      subscription = con.subscribe(`/topic/removeplayer/${roomId}`, (player) => {
        player = JSON.parse(player.body)
        dispatch(removePlayer(player))
        dispatch(setOwner(player.newOwner))
      });
    });
    return subscription
  };

  const subscribeToTurnEnds = () => {
    const con = client("http://localhost:8080/ws");
    con.debug = () => {};
    let subscription;
    con.connect({}, () => {
      subscription = con.subscribe(`/topic/endturn/${roomId}`, (players) => {
        players = JSON.parse(players.body)
      });
    });
    return subscription
  };

  useEffect(() => {
    const newPlayerSubscription = subscribeToNewPlayer()
    const exitingPlayerSubscription = subscribeToExitingPlayer()
    const turnEndSubscription = subscribeToTurnEnds()
    return ()=>{
      newPlayerSubscription.unsubscribe()
      exitingPlayerSubscription.unsubscribe()
      turnEndSubscription.unsubscribe()
    }
  }, [])
  
  return (
    <section className="h-full w-1/2 overflow-y-scroll pl-1 scroll-smooth bg-[#0000001b]">
      {players.map((player) => (
        <PlayerListItem key={player.id} name={player.name} score={player.score} avatar={player.avatar}/>
      ))}
    </section>
  );
};

export default memo(PlayerList);
