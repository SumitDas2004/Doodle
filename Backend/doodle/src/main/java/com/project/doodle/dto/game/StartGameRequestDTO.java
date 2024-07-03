package com.project.doodle.dto.game;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StartGameRequestDTO {
    private long roomId;
    private int maxRounds;
}

