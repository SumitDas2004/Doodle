import React from 'react'

const PlayerListItem = ({name, score, avatar, isUser, isTurn}) => {
  return (
    <div className={`width-full min-h-12 h-max ${isUser?'bg-[#69e621]':'bg-white'} rounded-sm flex items-center border-b border-backBlue relative pl-2`}>
        <div className='h-11 w-11 rounded-full bg-white object-cover overflow-hidden'>
          <img src={avatar} alt="Not found"/>
        </div>
        <div className='ml-1 break-all break-words max-w-[60%]'>{name}</div>
        {isTurn && <span className='pl-1 h-6 w-6'><img src='https://img.icons8.com/?size=100&id=6rM43YNMgkta&format=png&color=000000'/></span>} 
        <div className=' right-2 absolute'>{score}</div>
    </div>
  )
}

export default PlayerListItem