package com.project.doodle.entity;

import com.project.doodle.dto.room.CreateRoomResponseDTO;
import lombok.*;

import java.util.List;
import java.util.Queue;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    private long id;
    private List<Player> players;
    private int turn;
    private String word;
    private long turnEndsAt;
    private int curRound;
    private int maxRounds;
    private int owner;
    private boolean gameRunning;
    private boolean turnRunning;
    private Queue<Integer> q;

    public CreateRoomResponseDTO toCreateRoomResponseDTO(int playerId, String playerName) {
        return CreateRoomResponseDTO.builder()
                .roomId(this.id)
                .players(this.getPlayers())
                .playerId(playerId)
                .playerName(playerName)
                .gameRunning(this.gameRunning)
                .curRound(this.curRound)
                .maxRounds(this.maxRounds)
                .turnEndsAt(0)
                .wordLen(this.word==null?0:this.word.length())
                .turn(this.turn)
                .owner(this.owner)
                .turnRunning(this.turnRunning)
                .build();
    }
}
