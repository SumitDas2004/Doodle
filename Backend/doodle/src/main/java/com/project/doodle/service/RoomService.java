package com.project.doodle.service;

import com.project.doodle.constants.DataStore;
import com.project.doodle.dto.room.CreateRoomRequestDTO;
import com.project.doodle.dto.room.CreateRoomResponseDTO;
import com.project.doodle.dto.room.JoinRoomDTO;
import com.project.doodle.entity.Player;
import com.project.doodle.entity.Room;
import com.project.doodle.exception.InvalidRoomIdException;
import com.project.doodle.exception.RoomFullException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedList;

@Service
public class RoomService {

    @Value("${base.id}")
    private long roomId;

    public CreateRoomResponseDTO createRoom(CreateRoomRequestDTO request)  {
        String playerName = request.getPlayerName();

        Player player = Player.builder()
                .id(1)
                .score(0)
                .name(playerName)
                .avatar(request.getPlayerAvatar())
                .build();
        long newRoomId;
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
        return newRoom.toCreateRoomResponseDTO(player.getId(), player.getName());
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
            return room.toCreateRoomResponseDTO(player.getId(), player.getName());
        }
    }

    public int leaveRoom(long roomId, int playerId){
        Player toRem = null;
        if(DataStore.currentRooms.get(roomId)==null)return 0;
        for(Player player:DataStore.currentRooms.get(roomId).getPlayers()){
            if(playerId==player.getId()) {
                toRem = player;
                break;
            }
        }
        DataStore.currentRooms.get(roomId).getPlayers().remove(toRem);
        if(DataStore.currentRooms.get(roomId).getPlayers().isEmpty()) {
            DataStore.currentRooms.remove(roomId);
            return -1;//Signifies that room is now empty and can be deleted
        }else if(playerId==DataStore.currentRooms.get(roomId).getOwner()) return DataStore.currentRooms.get(roomId).getPlayers().get(0).getId();
        else return DataStore.currentRooms.get(roomId).getOwner();
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
