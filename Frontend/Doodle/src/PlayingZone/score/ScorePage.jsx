import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerDetails } from "../../reduxStore/roomInfo";
import { endTurn } from "../../reduxStore/roomInfo";
import { hideScorePage } from "../../reduxStore/scorePage";

const ScorePage = () => {
  const dispatch = useDispatch();

  const newPlayerDetails = useSelector(
    (state) => state.scorePage.playerDetails
  );
  const oldPlayerDetails = useSelector((state) => state.roomInfo.players);
  const [playerAndScores, setPlayerAndScores] = useState();

  useEffect(() => {
    setPlayerAndScores(
      oldPlayerDetails.map((player) => {
        const correspondingNewPlayer = newPlayerDetails.find(
          (p) => p.id === player.id
        );
        return {
          name: player.name,
          score: correspondingNewPlayer.score - player.score,
        }; //Calculating score earned in the round
      })
    );
    dispatch(updatePlayerDetails(newPlayerDetails));
    setTimeout(() => {
      dispatch(endTurn());
      dispatch(hideScorePage());
    }, 5000);
  }, []);

  return (
    <div className=" z-50 h-full w-full absolute bg-[#000000a6] font-semibold text-[#54fa2f] flex justify-center items-center flex-col">
      {playerAndScores &&
        playerAndScores.map((player, ind) => (
          <span key={ind}>
            <span>{player.name}</span>
            {" : "}
            <span>{player.score}</span>
          </span>
        ))}
    </div>
  );
};

export default ScorePage;
