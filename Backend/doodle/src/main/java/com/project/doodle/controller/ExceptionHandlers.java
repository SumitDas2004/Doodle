package com.project.doodle.controller;

import com.project.doodle.exception.InvalidRoomIdException;
import com.project.doodle.exception.RoomFullException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandlers {
    @ExceptionHandler(RoomFullException.class)
    public ResponseEntity<?> roomFullException(RoomFullException e)  {
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("message", "Failed.");
        map.put("error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(InvalidRoomIdException.class)
    public ResponseEntity<?> invalidRoomIdException(InvalidRoomIdException e)  {
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("message", "Failed.");
        map.put("error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> internalServerError(Exception e)  {
        e.printStackTrace();
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("message", "Failed.");
        map.put("error", "Something went wrong.");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> internalServerError(MethodArgumentNotValidException e)  {
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("message", "Failed.");
        map.put("error", "Some fields are missing.");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
