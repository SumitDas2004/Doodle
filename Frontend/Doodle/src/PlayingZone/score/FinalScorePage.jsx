import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideFinalScorePage } from '../../reduxStore/scorePage'
import { endGame } from '../../reduxStore/roomInfo'


const FinalScorePage = () => {
  const dispatch = useDispatch()
  const players = useSelector(state=>state.roomInfo.players)
  const [timer, setTimer] = useState(10);

  useEffect(()=>{
    dispatch(endGame())
    setTimeout(() => {
      if(timer===0){
        dispatch(hideFinalScorePage())
        return ;
      }
      setTimer(timer-1);
    }, 1000);
  }, [timer])

  useEffect(()=>{
  }, [])

  return (
    <div><div className=" z-50 h-full w-full absolute bg-[#000000b9] font-semibold flex justify-center items-center flex-col">
    <div className=" w-full flex justify-end items-end p-10 text-white">
      {timer}s
    </div>
    <div className="w-max flex-grow">
      {players &&
        players.map((player, ind) => (
          <span key={ind}>
            <div className="flex">
              <span className="text-white">{player.name + ": "}</span>
              <span
                className={`${
                  !player.score ? "text-red-500" : "text-[#54fa2f]"
                }`}
              >
                {player.score}
              </span>
            </div>
          </span>
        ))}
    </div>
  </div>
  </div>
  )
}

export default FinalScorePage