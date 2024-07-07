package com.project.doodle.controller;


import com.project.doodle.constants.DataStore;
import com.project.doodle.dto.game.RoomInformationDTO;
import com.project.doodle.dto.room.DrawingDTO;
import com.project.doodle.dto.room.MessageDTO;
import com.project.doodle.entity.Player;
import com.project.doodle.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://doodlefrontend.vercel.app/", "http://localhost:5173"})
public class WebSocketMessageController {

    @Autowired
    SimpMessagingTemplate template;


    @MessageMapping("/message/{roomId}")
    @SendTo("/topic/message/{roomId}")
    public MessageDTO handleMessage(@DestinationVariable long roomId, @Payload MessageDTO message){
//        If a round is running and the message sent by an user matches the current word in the room then that
//        is a correct guess.
        if(message.isTurnRunning()){
            Room room = DataStore.currentRooms.get(roomId);
            if(message.getBody().equals(room.getWord())) {
                message.setRightGuess(true);
                //If the guess is correct then we should not send the message back to all users
                message.setBody("");

                //Calculating and updating the score of the guesser
                int score = (int)((room.getTurnEndsAt()-System.currentTimeMillis())/10000);
                if(score>=50)score+=300;
                else if(score>=40)score+=200;
                else if(score>=30)score+=100;
                else if(score>10)score+=70;
                else score+=50;

                Player guesser = findPlayerById(room.getPlayers(), message.getSenderId());
                guesser.setScore(guesser.getScore()+score);

                //Calculating and updating the score of the drawer

                Player drawer = findPlayerById(room.getPlayers(), room.getTurn());
                drawer.setScore(drawer.getScore()+score/3);

            }
        }
        return message;
    }


    @MessageMapping("/drawing/{roomId}")
    @SendTo("/topic/drawing/{roomId}")
    public DrawingDTO handleDrawing(@DestinationVariable long roomId, @Payload DrawingDTO request){
        return request;
    }


    @MessageMapping("/newplayer/{roomId}")
    @SendTo("/topic/newplayer/{roomId}")
    public Player handleIncomingPlayer(@DestinationVariable long roomId, @Payload Player request){
        return request;
    }

    public void endTurn(long roomId, List<Player> players, String word ){
        Map<String, Object> map = new HashMap<>();
        map.put("players", players);
        map.put("word", word);

        this.template.convertAndSend("/topic/endturn/"+roomId, map);
    }


    public void removePlayer(long roomId, @Payload Map<String, Integer> request){
        this.template.convertAndSend("/topic/removeplayer/"+roomId, request);
    }

    public void sendRoomInformation(@Payload Room room){
        this.template.convertAndSend("/topic/roominfo/"+room.getId(), RoomInformationDTO.builder()
                .gameRunning(room.isGameRunning())
                .turn(room.getTurn())
                .maxRounds(room.getMaxRounds())
                .curRound(room.getCurRound())
                .turnRunning(room.isTurnRunning())
                .wordLen(room.getWord()!=null?room.getWord().length():0)
                .turnEndsAt(room.getTurnEndsAt())
                .build());
    }

    public void endGame(long roomId){
        Map<String, Object> map = new HashMap<>();
        map.put("endGame", true);

        this.template.convertAndSend("/topic/endgame/"+roomId, map);
    }

    //utility functions
    private Player findPlayerById(List<Player> players, int id){
        for(Player player:players){
            if(player.getId()==id)
                return player;
        }
        return null;
    }
}
