import { configureStore } from '@reduxjs/toolkit'
import isJoiningRoomReducer from './isJoiningRoomReducer'
import roomInfo from './roomInfo'
import scorePage from './scorePage'

export const store = configureStore({
  reducer: {
    isJoiningRoom: isJoiningRoomReducer,
    roomInfo: roomInfo,
    scorePage: scorePage
  },
})