import { createSlice } from "@reduxjs/toolkit";
import { client } from "stompjs";


const connection = new client("http://localhost:8080/ws")
connection.debug = ()=>{}
const initialState = {
    connection: connection
}
const connectionState = createSlice({
    name:'websocket',
    initialState,
    reducers:{
    }
})

export default connectionState.reducer