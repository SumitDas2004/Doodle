package com.project.doodle.dto.room;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinRoomDTO {
    @NotNull(message = "RoomId can't be blank")
    Long roomId;
    @NotBlank(message = "Player name can't be blank")
    String playerName;
    String playerAvatar;
}
