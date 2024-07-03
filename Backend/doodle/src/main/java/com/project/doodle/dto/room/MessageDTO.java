package com.project.doodle.dto.room;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class MessageDTO {
    private String senderName;
    private String body;
    private boolean turnRunning;
    private boolean rightGuess;
    private int senderId;
}
