package com.project.doodle.dto.room;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomRequestDTO {
    @NotBlank(message = "Player name can't be blank")
    String playerName;
    String playerAvatar;
}
