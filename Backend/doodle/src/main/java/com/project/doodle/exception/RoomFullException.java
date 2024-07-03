package com.project.doodle.exception;

public class RoomFullException extends RuntimeException {
    public RoomFullException(){
        super("Room is full");
    }
}
