import { configureStore } from '@reduxjs/toolkit'
import isJoiningRoomReducer from './isJoiningRoomReducer'
import roomInfo from './roomInfo'

export const store = configureStore({
  reducer: {
    isJoiningRoom: isJoiningRoomReducer,
    roomInfo: roomInfo,
  },
})