package com.project.doodle.dto.game;

import com.project.doodle.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StopTurnResponseDTO {
    List<Player> players;
}
