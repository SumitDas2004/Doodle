package com.project.doodle.service;

import com.project.doodle.constants.DataStore;
import com.project.doodle.controller.WebSocketMessageController;
import com.project.doodle.dto.room.CreateRoomRequestDTO;
import com.project.doodle.dto.room.CreateRoomResponseDTO;
import com.project.doodle.dto.room.JoinRoomDTO;
import com.project.doodle.entity.Player;
import com.project.doodle.entity.Room;
import com.project.doodle.exception.InvalidRoomIdException;
import com.project.doodle.exception.RoomFullException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

@Service
public class RoomService {

    @Value("${base.id}")
    private long roomId;

    @Autowired
    WebSocketMessageController wsController;

    @Autowired
    GameService gameService;



    public CreateRoomResponseDTO createRoom(CreateRoomRequestDTO request)  {
        String playerName = request.getPlayerName();

        Player player = Player.builder()
                .id(1)
                .score(0)
                .name(playerName)
                .avatar(request.getPlayerAvatar())
                .build();
        long newRoomId ;
        synchronized (this){
            newRoomId = ++this.roomId;
        }
        Room newRoom = Room.builder()
                .id(newRoomId)
                .players(new LinkedList<>(Arrays.asList(player)))
                .turn(0)
                .word(null)
                .turnEndsAt(0)
                .curRound(0)
                .maxRounds(0)
                .owner(player.getId())
                .gameRunning(false)
                .build();
        DataStore.currentRooms.put(newRoomId, newRoom);
        return newRoom.toCreateRoomResponseDTO(player.getId(), player.getName(), 0);
    }

    public CreateRoomResponseDTO joinRoom(JoinRoomDTO request){
        if(!DataStore.currentRooms.containsKey(request.getRoomId()))throw new InvalidRoomIdException();

        Room room = DataStore.currentRooms.get(request.getRoomId());

        synchronized (room) {
            Player player = Player.builder()
                    .id(generatePlayerId(room))
                    .score(0)
                    .name(request.getPlayerName())
                    .avatar(request.getPlayerAvatar())
                    .build();
            room.getPlayers().add(player);
            return room.toCreateRoomResponseDTO(player.getId(), player.getName(), room.getTurnEndsAt());
        }
    }

    public void leaveRoom(long roomId, int playerId){
        Player toRem = null;
        Room room = DataStore.currentRooms.get(roomId);
        if(room==null)return ;
        for(Player player:room.getPlayers()){
            if(playerId==player.getId()) {
                toRem = player;
                break;
            }
        }
        room.getPlayers().remove(toRem);
        if(room.getPlayers().isEmpty()) {
            DataStore.currentRooms.remove(roomId);
            return ;
            //Signifies that room is now empty and can be deleted
        }



        if(playerId==room.getTurn()){
            if(playerId==room.getOwner()) {
                int newOwner = room.getPlayers().get(0).getId();
                room.setOwner(newOwner);
            }
            gameService.stopTurn(roomId);
            //When the user with turn leaves the room then the turn needs to end.
            //So we can simply call end turn. End turn function returns list of all current players
            //hence no need to call leave room

            return ;
        }
        if(playerId==room.getOwner()) {
            int newOwner = room.getPlayers().get(0).getId();
            room.setOwner(newOwner);
        }
        Map<String, Integer> request = new HashMap<>();
        request.put("playerId", playerId);
        request.put("newOwner", room.getOwner());
        wsController.removePlayer(roomId, request);

        //if only a single player is left then end the game.
        if(room.getPlayers().size()==1){
            wsController.endGame(roomId);
        }
    }


    private int generatePlayerId(Room room){
        if(room.getPlayers().size()==8)throw new RoomFullException();
        int missingId = 1;
        for(int i=1;i<=8;i++){
            boolean flag = false;
            for(Player player:room.getPlayers()) if(player.getId()==i)flag = true;
            if(!flag){
                missingId=i;
                break;
            }
        }
        return missingId;
    }
}
