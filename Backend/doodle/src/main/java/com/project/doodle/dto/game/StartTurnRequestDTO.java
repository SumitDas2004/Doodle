package com.project.doodle.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StartTurnRequestDTO {
    private String word;
    private long roomId;
}
