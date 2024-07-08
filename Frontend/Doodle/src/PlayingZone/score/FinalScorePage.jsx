import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideFinalScorePage } from '../../reduxStore/scorePage'
import { endGame, resetScores } from '../../reduxStore/roomInfo'


const FinalScorePage = () => {
  const dispatch = useDispatch()
  const players = useSelector(state=>state.roomInfo.players)
  const [timer, setTimer] = useState(10);

  useEffect(()=>{
    dispatch(endGame())
    setTimeout(() => {
      if(timer===0){
        dispatch(resetScores())
        dispatch(hideFinalScorePage())
        return ;
      }
      setTimer(timer-1);
    }, 1000);
  }, [timer])

  useEffect(()=>{
  }, [])

  const positionIcons = ['https://img.icons8.com/?size=100&id=BG0raGiettHF&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=YWZ0y0ocSkyv&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=jQphvKH4JywQ&format=png&color=000000'
  ]

  return (
    <div className="  curtainDown z-50 h-full w-full absolute bg-[#000000b9] font-semibold flex justify-center items-center flex-col">
    <div className=" w-full flex justify-end items-end p-10 text-white">
      {timer}s
    </div>
    <div className="w-max flex-grow">
      {players &&
        players.map((player, ind) => (
          <span key={ind}>
            <div className="flex">
              {ind<=2?<span className='h-6 w-6'><img src={positionIcons[ind]} /></span>:<span className='h-6 w-6 text-center text-white'>{ind+1}th</span>}
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
  )
}

export default FinalScorePage