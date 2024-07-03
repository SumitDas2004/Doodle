package com.project.doodle.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Player {
    private int id;
    private String name;
    private int score;
    private String avatar;
}
