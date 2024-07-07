import React, { memo, useRef, useState, useEffect } from 'react'
import ChatItem from './ChatItem'
import SockJS from 'sockjs-client'
import { over } from "stompjs";
import { useSelector, useDispatch } from 'react-redux';
import { setGuessedWord } from '../../../reduxStore/roomInfo';

const Chats = () => {
  let listItemNo = useRef(0)

  const dispatcher = useDispatch()

  let [messages, setMessages] = useState([])

  const roomId = useSelector(state=>state.roomInfo.roomId)
  const playerId = useSelector(state=>state.roomInfo.playerId)
  
  const subscribe = () => {
    const sock = new SockJS(`${import.meta.env.VITE_WEB_SERVICE_URL}/ws`)
    const con = over(sock);
    con.debug = ()=>{}
      con.connect({}, ()=>{
        con.subscribe(`/topic/message/${roomId}`, (message)=>{
          const parsedMesage =  JSON.parse(message.body)
          setMessages((prev)=>[...prev, parsedMesage])
          if(parsedMesage.rightGuess && parsedMesage.senderId===playerId){
            dispatcher(setGuessedWord(true))
          }
        })
      })
  }

  useEffect(() => {
    subscribe()
  }, [])
  
  
  
  
  return (
    <section className='h-full w-1/2 overflow-y-scroll scroll-smooth bg-[#0000001b]'>
      
      {
        messages.map((message)=><ChatItem key={listItemNo.current++} isRightGuess={message.rightGuess} sender={message.senderName} body={message.body}/>)
      }

    </section>

  )
}

export default memo(Chats)