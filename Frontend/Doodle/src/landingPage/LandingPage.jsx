import React, { memo } from 'react'
import { useState } from 'react'
import Form from './Form'
import { ClockLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const LandingPage = () => {
  const [formState, setFormState] = useState('create')
  const isJoining = useSelector((state)=>state.isJoiningRoom.value);
  const toggleFormState= () =>{
    setFormState(formState==='create'?'join':'create');
  }
  return (
    <div className=' bg-backBlue flex flex-col h-screen w-full justify-center items-center relative'>
      <Form formState={formState} toggleFormState={toggleFormState}/>
      <div className={`rounded-full bg-white flex justify-center items-center ${isJoining?'h-[30vh] w-[30vh]':'h-0 w-0'} overflow-hidden transition-all duration-200 absolute z-50`}>
        <ClockLoader color='#4a53b5' size='150px'/>
      </div>
    </div>
  )
}



export default memo(LandingPage)