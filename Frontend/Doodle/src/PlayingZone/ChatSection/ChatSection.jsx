import React from 'react'
import PlayerList from './PlayerList/PlayerList'
import Chats from './Chats/Chats'

const ChatSection = () => {
  return (
    <div className='h-[32%] w-full flex flex-row py-1'>
        <PlayerList/>
        <Chats/>
    </div>
  )
}

export default ChatSection