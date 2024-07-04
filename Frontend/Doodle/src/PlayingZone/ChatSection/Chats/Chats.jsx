import React, { memo, useRef, useState, useEffect } from 'react'
import ChatItem from './ChatItem'
import { client } from "stompjs";
import { useSelector, useDispatch } from 'react-redux';
import { setGuessedWord, setWord } from '../../../reduxStore/roomInfo';

const Chats = () => {
  let listItemNo = useRef(0)

  const dispatcher = useDispatch()

  let [messages, setMessages] = useState([])

  const roomId = useSelector(state=>state.roomInfo.roomId)
  const playerId = useSelector(state=>state.roomInfo.playerId)
  
  const subscribe = () => {
    const con = client('http://localhost:8080/ws')
    con.debug = ()=>{}
      let subscription;
      con.connect({}, ()=>{
        subscription = con.subscribe(`/topic/message/${roomId}`, (message)=>{
          const parsedMesage =  JSON.parse(message.body)
          setMessages((prev)=>[...prev, parsedMesage])
          if(parsedMesage.rightGuess && parsedMesage.senderId===playerId){
            dispatcher(setGuessedWord(true))
          }
        })
      })
      return subscription
  }

  useEffect(() => {
    const subscription = subscribe()
    return ()=>{
      con.disconnect(()=>subscription.unsubscribe())
    }
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