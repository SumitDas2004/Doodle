import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePlayerDetails } from "../../reduxStore/roomInfo";
import { endTurn } from "../../reduxStore/roomInfo";
import { hideScorePage } from "../../reduxStore/scorePage";

const ScorePage = () => {
  const dispatch = useDispatch();

  const newPlayerDetails = useSelector((state) => state.scorePage.playerDetails);
  const oldPlayerDetails = useSelector((state) => state.roomInfo.players);
  const word = useSelector((state) => state.scorePage.word);
  const [playerAndScores, setPlayerAndScores] = useState();
  const [timer, setTimer] = useState(5);


  useEffect(() => {
    setPlayerAndScores(
      newPlayerDetails.map((player) => {
        const correspondingNewPlayer = oldPlayerDetails.find(
          (p) => p.id === player.id
        );
        return {
          name: player.name,
          score:  player.score - correspondingNewPlayer.score ,
        }; //Calculating score earned in the round
      }).sort((x, y)=>(x.score-y.score)*-1)
    );
    

    dispatch(updatePlayerDetails(newPlayerDetails));
    setTimer(5);

  }, []);

  useEffect(()=>{
    setTimeout(() => {
      if(timer===0){
        dispatch(endTurn());
        dispatch(hideScorePage());
        return ;
      }
      setTimer(timer-1);
    }, 1000);
  }, [timer])

  return (
    <div className="  curtainDown z-50 h-full w-full absolute bg-[#000000b9] font-semibold flex justify-center items-center flex-col">
      <div className=" w-full flex justify-end items-end p-10 text-white">
        {timer}s
      </div>
      <div className="text-white mb-4">The word was <em>{word}</em></div>
      <div className="w-max flex-grow">
        {playerAndScores &&
          playerAndScores.map((player, ind) => (
            <span key={ind}>
              <div className="flex">
                <span className="text-white">{player.name + ": "}</span>
                <span
                  className={`${
                    !player.score ? "text-red-500" : "text-[#54fa2f]"
                  }`}
                >
                  {player.score && "+"}
                  {player.score}
                </span>
              </div>
            </span>
          ))}
      </div>
    </div>
  );
};

export default memo(ScorePage);
