package com.project.doodle.dto.room;


import com.project.doodle.entity.Player;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRoomResponseDTO {
    private long roomId;
    private int playerId;
    private String playerName;
    private List<Player> players;
    private boolean gameRunning;
    private int maxRounds;
    private int curRound;
    private int owner;
    private long turnEndsAt;
    private int wordLen;
    private int turn;
    private boolean turnRunning;
}
