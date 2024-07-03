package com.project.doodle.dto.game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StartResponseDTO {
    private boolean gameRunning;
    private boolean turnRunning;
    private int maxRounds;
    private int curRound;
    private int turn;
    private int wordLen;
    private long turnEndsAt;
}
