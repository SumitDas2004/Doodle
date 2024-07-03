import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const isJoiningRoom = createSlice({
  name: 'isJoiningRoom',
  initialState,
  reducers: {
    setIsJoiningRoom: (state, action)=>{
        state.value = action.payload
    }
  },
})

export const { setIsJoiningRoom } = isJoiningRoom.actions

export default isJoiningRoom.reducer