import React from 'react'

const PlayerListItem = ({name, score, avatar}) => {
  return (
    <div className='width-full h-12 bg-white rounded-sm flex items-center border-b border-backBlue relative pl-2'>
        <div className='h-12 w-12 rounded-full'>
          <img src={avatar} alt="Not found"/>
        </div>
        <span className='ml-1'>{name}</span>
        <span className=' right-2 absolute'>{score}</span>
    </div>
  )
}

export default PlayerListItem