import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPlaying: false,
    players: [],
    roomId: 0,
    playerId: 0,
    playerName: '',
    owner:0,
    turn:0,
    maxRounds:0,
    curRound:0,
    turnEndsAt:0,
    gameRunning:false,
    wordLen:0,
    guessedWord:false,
    word:""
}

const roomInfoSlice = createSlice({
    name: 'roomInfo',
    initialState,
    reducers: {
        changeRoomInfo: (state, action)=>{
            state.isPlaying = action.payload.isPlaying
            state.players.push(...action.payload.players)
            state.roomId = action.payload.roomId
            state.playerId = action.payload.playerId
            state.playerName = action.payload.playerName
            state.owner = action.payload.owner
            state.turn = action.payload.turn
            state.maxRounds = action.payload.maxRounds
            state.curRound = action.payload.curRound
            state.turnEndsAt = action.payload.turnEndsAt
            state.gameRunning = action.payload.gameRunning
            state.turnRunning = action.payload.turnRunning
            state.wordLen =  action.payload.wordLen
            state.guessedWord = false
            state.word = ""
        },
        addPlayer:(state, action)=>{
            state.players.push(action.payload)
        },
        removePlayer:(state, action)=>{
            let ind = 0;
            while(state.players[ind].id!=action.payload.playerId)ind++;
            state.players.splice(ind, 1)
        },
        setOwner:(state, action)=>{
            state.owner = action.payload
        },
        startGame: (state, action)=>{//reducer used when a game is started
            state.maxRounds = action.payload.maxRounds
            state.curRound = action.payload.curRound
            state.turn = action.payload.turn
            state.gameRunning = action.payload.gameRunning
            state.turnRunning = action.payload.turnRunning
            state.wordLen = action.payload.wordLen
            state.turnEndsAt = action.payload.turnEndsAt
        },
        setGuessedWord: (state, action)=>{
            state.guessedWord = action.payload
        },
        setWord: (state, action)=>{
            state.word = action.payload
        }
    }
})


export const {changeRoomInfo, addPlayer, removePlayer, setOwner, startGame, setGuessedWord, setWord} = roomInfoSlice.actions


export default roomInfoSlice.reducer