import { configureStore } from '@reduxjs/toolkit'
import isJoiningRoomReducer from './isJoiningRoomReducer'
import roomInfo from './roomInfo'
import StompConnection from './StompConnection'

export const store = configureStore({
  reducer: {
    isJoiningRoom: isJoiningRoomReducer,
    roomInfo: roomInfo,
    StompConnection : StompConnection
  },
})