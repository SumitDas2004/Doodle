package com.project.doodle.exception;

public class InvalidRoomIdException extends RuntimeException {
    public InvalidRoomIdException(){
        super("RoomId is not valid.");
    }
}
