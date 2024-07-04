package com.project.doodle.service;

import com.project.doodle.constants.DataStore;
import com.project.doodle.controller.WebSocketMessageController;
import com.project.doodle.dto.game.StartGameRequestDTO;
import com.project.doodle.dto.game.StartTurnRequestDTO;
import com.project.doodle.entity.Player;
import com.project.doodle.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {
    @Autowired
    WebSocketMessageController wsController;

    //used to start a game
    public void startGame(StartGameRequestDTO request){
        Room room = DataStore.currentRooms.get(request.getRoomId());
        room.setMaxRounds(request.getMaxRounds());
        room.setCurRound(1);
        room.setGameRunning(true);
        room.setTurnRunning(false);
        room.setWord(null);
        room.setQ(new LinkedList<>(room.getPlayers().stream().map(player->player.getId()).collect(Collectors.toList())));
        room.setTurn(room.getQ().peek());
        wsController.sendRoomInformation(room);
    }

    //used to start a new turn
    public void startTurn(StartTurnRequestDTO request) {
        Room room = DataStore.currentRooms.get(request.getRoomId());
        room.setWord(request.getWord());
        room.setTurnRunning(true);
        room.setTurnEndsAt(System.currentTimeMillis()+60000);
        if(room.getQ().isEmpty()){
            room.setCurRound(room.getCurRound()+1);
            room.setQ(new LinkedList<>(room.getPlayers().stream().map(player->player.getId()).collect(Collectors.toList())));
        }
        room.setTurn(room.getQ().peek());
        wsController.sendRoomInformation(room);
    }

    //used to stop current turn
    public void stopTurn(long roomId) {
        Room room = DataStore.currentRooms.get(roomId);
        room.setWord("");
        room.setTurnRunning(false);
        room.setTurnEndsAt(System.currentTimeMillis());
        room.getQ().poll();
        room.setTurn(room.getQ().peek());
        wsController.endTurn(roomId, room.getPlayers());
    }
}
